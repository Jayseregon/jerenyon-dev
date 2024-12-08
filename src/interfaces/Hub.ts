export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface Article {
  thumbnail: string;
  title: string;
  description: string;
}

export interface MainCategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  footerText: string;
  articles: Article[];
}
