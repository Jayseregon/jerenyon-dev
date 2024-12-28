import { AdminAvatar } from "@/components/auth/AdminAvatar";
import { AuthPageTitleProps } from "@/interfaces/Auth";

export const AuthPageTitle = ({
  pageTitle,
  heroTitle,
  image,
}: AuthPageTitleProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-purple-800 dark:text-purple-300 mb-3">{pageTitle}</h1>
      <AdminAvatar image={image} />
      <div className="py-5" />
      <h2 className="text-5xl font-bold">{heroTitle}</h2>
    </div>
  );
};
