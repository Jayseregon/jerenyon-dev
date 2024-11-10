import DynamicDocTemplate, {
  generateMetadataTemplate,
  generateStaticParamsTemplate,
} from "@/components/mdx/DynamicDocTemplate";

const postType = "blogs-articles";

export default async function MdPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return <DynamicDocTemplate postType={postType} slug={slug} />;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  return generateMetadataTemplate({ slug: slug, postType: postType });
}

export const generateStaticParams = () =>
  generateStaticParamsTemplate(postType);
