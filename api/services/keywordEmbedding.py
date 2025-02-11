from transformers import AutoTokenizer, AutoModel
import torch
from sklearn.decomposition import PCA
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from pydantic import BaseModel


class EmbeddedKeyword(BaseModel):
    word: str
    x: float
    y: float


class Embeddings(BaseModel):
    keywords: list[EmbeddedKeyword]


class EmbeddingService:
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2"):
        # Updated to use Hugging Face
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModel.from_pretrained(model_name)

    def create_embeddings(self, keywords: list) -> np.ndarray:
        inputs = self.tokenizer(
            keywords, padding=True, truncation=True, return_tensors="pt"
        )
        outputs = self.model(**inputs)
        # Mean pooling
        embeddings = outputs.last_hidden_state
        attention_mask = (
            inputs["attention_mask"].unsqueeze(-1).expand(embeddings.size()).float()
        )
        summed = torch.sum(embeddings * attention_mask, dim=1)
        summed_mask = torch.clamp(attention_mask.sum(dim=1), min=1e-9)
        pooled = summed / summed_mask
        return pooled.detach().numpy()

    def reduce_dimensions(
        self, embeddings: np.ndarray, n_components: int = 2
    ) -> np.ndarray:
        pca = PCA(n_components=n_components)
        return pca.fit_transform(embeddings)

    def get_normalized_list(
        self, embeddings: np.ndarray, range: tuple[float, float] = (0, 1)
    ) -> list:
        scaler = MinMaxScaler(feature_range=range)
        normalized = scaler.fit_transform(embeddings)
        return normalized.tolist()

    def get_embeddings(self, normalized_embeddings: list, keywords: list) -> Embeddings:
        return Embeddings(
            keywords=[
                EmbeddedKeyword(word=word, x=x, y=y)
                for word, (x, y) in zip(keywords, normalized_embeddings)
            ]
        )

    def process_keywords(self, keywords: list) -> Embeddings:
        embeddings = self.create_embeddings(keywords)
        reduced = self.reduce_dimensions(embeddings, n_components=2)
        normalized = self.get_normalized_list(reduced)
        return self.get_embeddings(normalized, keywords)
