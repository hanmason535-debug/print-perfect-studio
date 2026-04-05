import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

const SEO = ({ title, description, ogImage }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {ogImage && <meta property="og:image" content={ogImage} />}
  </Helmet>
);

export default SEO;
