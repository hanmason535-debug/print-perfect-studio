import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  ogType?: string;
  robots?: string;
  prefetchImage?: string;
}

const SEO = ({ title, description, ogImage, canonical, ogType = "website", robots = "index, follow", prefetchImage }: SEOProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content={robots} />
    {prefetchImage && <link rel="preload" as="image" href={prefetchImage} />}
    <meta property="og:site_name" content="Paras Graphics" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content={ogType} />
    <meta property="og:locale" content="en_IN" />
    {ogImage && <meta property="og:image" content={ogImage} />}
    {canonical && <link rel="canonical" href={canonical} />}
    {canonical && <meta property="og:url" content={canonical} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {ogImage && <meta name="twitter:image" content={ogImage} />}
  </Helmet>
);

export default SEO;