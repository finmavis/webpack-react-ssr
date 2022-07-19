import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

const SITE_URL = process.env.SITE_URL;

export interface HeadProps {
  lang?: string;
  title?: string;
  description?: string;
  image?: string;
  noCrawl?: boolean;
  contentType?: string;
  children?: ReactNode;
}

export default function Head({
  lang,
  title,
  description,
  image,
  noCrawl,
  contentType,
  children,
}: HeadProps) {
  const { pathname } = useLocation();
  const metaImage = `${SITE_URL}${image}`;
  const metaUrl = `${SITE_URL}${pathname || '/'}`;

  return (
    <Helmet>
      {/* General Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='image' content={metaImage} />
      {noCrawl && <meta name='robots' content='noindex, nofollow' />}

      {/* OpenGraph tags */}
      <meta property='og:url' content={metaUrl} />
      <meta property='og:type' content={contentType} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={metaImage} />
      <meta property='og:site_name' content='Your Site Name' />

      {/* Twitter Card tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@YourTwitter' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={metaImage} />
      {children}
    </Helmet>
  );
}

Head.defaultProps = {
  lang: `en`,
  title: ``,
  description: ``,
  image: `/opengraph.jpg`,
  noCrawl: false,
  contentType: `website`,
};

Head.propTypes = {
  lang: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  noCrawl: PropTypes.bool,
  contentType: PropTypes.string,
  children: PropTypes.node,
};
