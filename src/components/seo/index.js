/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, {useEffect, useState} from "react"
import {useSelector}  from "react-redux";
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import {localize, updateLocale} from 'src/utils/locale';

function SEO({ localeKey = '', description, lang, meta, title }) {

  const selectedLocale = useSelector(store => store.root.ux.locale.selected);
  // eslint-disable-next-line
  const [_, setUpdatingLocale] = useState(false);
  useEffect(() => {
    setUpdatingLocale(true);
    updateLocale({
      rootKey:    localeKey,
      code:       selectedLocale.code,
      path:       'components/seo/l18n',
      cb:         () => setUpdatingLocale(false),
    })
  }, [selectedLocale]);

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const titleLocale = localize(`${localeKey}.title`) || title;
  const langLocale = selectedLocale.code || lang;

  return (
    <Helmet
      htmlAttributes={{
        lang: langLocale,
      }}
      title={titleLocale}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
  title: "Home"
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
