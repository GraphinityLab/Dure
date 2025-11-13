import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image = "/icon.png",
  url,
  type = "website",
  author = "Dure Aesthetics",
  og = {},
  twitter = {},
}) => {
  const siteName = "Dure Aesthetics";
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://dureaesthetics.com";
  const canonicalUrl = url ? `${siteUrl}${url}` : (typeof window !== "undefined" ? window.location.href : siteUrl);
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const ogTitle = og.title || fullTitle;
  const ogDescription = og.description || description;
  const ogImage = og.image || fullImageUrl;
  const ogType = og.type || type;
  const ogUrl = og.url || canonicalUrl;

  const twitterCard = twitter.card || "summary_large_image";
  const twitterTitle = twitter.title || fullTitle;
  const twitterDescription = twitter.description || description;
  const twitterImage = twitter.image || fullImageUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      {og.locale && <meta property="og:locale" content={og.locale} />}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="theme-color" content="#f9f4ef" />
    </Helmet>
  );
};

export default SEO;

