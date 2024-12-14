import { TiptapEditor } from "@/src/components/hobbiton/TiptapEditor";
import { BLogPostReaderProps } from "@/src/interfaces/Hub";

export const BlogPostReader = ({ content }: BLogPostReaderProps) => {
  return (
    <div className="prose light:prose-lightTheme dark:prose-darkTheme w-full mx-auto border border-red-500">
      <TiptapEditor content={JSON.parse(content)} editable={false} />
    </div>
  );
};
