import { Card, CardHeader, CardFooter, Button, Image } from "@nextui-org/react";

interface Article {
  thumbnail: string;
  title: string;
  description: string;
}

interface MainCategoryCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  footerText: string;
  articles: Article[];
}

const MainCategoryCard = ({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  buttonText,
  footerText,
  articles,
}: MainCategoryCardProps) => {
  return (
    <Card
      isFooterBlurred
      className="relative w-full border border-purple-800 dark:border-purple-300"
    >
      <CardHeader className="absolute z-30 top-1 flex-col items-start">
        <p className="text-sm text-white/60 uppercase font-bold">{subtitle}</p>
        <h4 className="text-white font-medium text-2xl">{title}</h4>
      </CardHeader>
      <div className="relative flex-grow overflow-x-scroll">
        <Image
          removeWrapper
          alt={imageAlt}
          className="z-0 w-full h-full object-cover opacity-20"
          src={imageSrc}
        />
        <div className="absolute z-30 top-0 left-0 right-0 p-4 mt-20 h-full">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex items-start mb-4 bg-white bg-opacity-90 p-2 rounded-lg shadow-md"
            >
              <Image
                removeWrapper
                alt={article.title}
                className="w-12 h-12 mr-4 rounded-lg"
                src={article.thumbnail}
              />
              <div>
                <h5 className="text-lg font-semibold">{article.title}</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {article.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CardFooter className="relative bg-purple-800/30 dark:bg-purple-300/30 border-t-1 border-zinc-100/50 z-30 justify-between p-4">
        <p className="text-foreground text-start max-w-sm text-sm">
          {footerText}
        </p>
        <Button
          className="bg-background text-foreground py-2 px-4 border border-purple-800 dark:border-purple-300 hover:bg-purple-800 hover:text-background hover:dark:text-purple-300 focus:outline-none"
          color="primary"
          radius="full"
          size="sm"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MainCategoryCard;
