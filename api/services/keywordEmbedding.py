from sentence_transformers import SentenceTransformer
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
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model = SentenceTransformer(model_name)

    def create_embeddings(self, keywords: list) -> np.ndarray:
        return self.model.encode(keywords)

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
