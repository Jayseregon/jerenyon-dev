import DynamicDocTemplate, {
  generateMetadataTemplate,
  generateStaticParamsTemplate,
} from "@/components/mdx/DynamicDocTemplate";

const postType = "blogs-articles";

export default async function MdPage({ params }: { params: { slug: string } }) {
  return <DynamicDocTemplate params={params} postType={postType} />;
}

export const generateMetadata = (props: { params: { slug: string } }) =>
  generateMetadataTemplate({ ...props, postType: postType });

export const generateStaticParams = () =>
  generateStaticParamsTemplate(postType);
