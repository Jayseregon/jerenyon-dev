import {
  Card,
  CardHeader,
  CardFooter,
  Button,
  Image,
  CardBody,
} from "@nextui-org/react";

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
    <div className="flex flex-col space-y-2">
      <h2 className="text-white font-medium text-2xl">{title}</h2>
      <Card
        isFooterBlurred
        className="relative text-start w-full border border-purple-800 dark:border-purple-300 flex flex-col"
      >
        <div className="relative">
          <Image
            removeWrapper
            alt={imageAlt}
            className="absolute inset-0 z-0 w-full h-full object-cover"
            src={imageSrc}
          />
          <div className="relative z-10">
            <CardHeader className="flex-col items-start px-4">
              <p className="text-sm text-white/60 uppercase font-bold">
                {subtitle}
              </p>
            </CardHeader>
            <CardBody className="px-4">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="flex items-start mb-4 bg-white p-2 rounded-lg shadow-md"
                >
                  <Image
                    removeWrapper
                    alt={article.title}
                    className="w-12 h-12 mr-4 rounded-lg"
                    src={article.thumbnail}
                  />
                  <div>
                    <h5 className="text-lg font-semibold text-foreground dark:text-background">
                      {article.title}
                    </h5>
                    <p className="text-sm text-gray-600">
                      {article.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardBody>
            <CardFooter className="bg-purple-800/50 dark:bg-purple-300/70 border-t-1 border-zinc-100/50 justify-between p-4">
              <p className="text-background text-start font-semibold w-2/3 text-sm">
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
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainCategoryCard;
