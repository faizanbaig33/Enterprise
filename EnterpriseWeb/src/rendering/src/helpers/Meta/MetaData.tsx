import { Project } from 'src/.generated/Project.AndersenCorporation.model';
import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import Head from 'next/head';
import { getEnum } from 'lib/utils';

export type MetaRobots = 'Follow' | 'Index' | 'No Follow' | 'No Index';

const MetaData = () => {
  const context = useSitecoreContext();

  const route = context.sitecoreContext.route;

  const page = route as Project.AndersenCorporation.AndersenWindows.Pages.StandardPage;

  const fields = page.fields;

  const title = fields?.pageTitle?.value;

  const robots = fields?.metaRobots?.map((_item) => getEnum<MetaRobots>(_item)).join(', ');

  const renderNameValueMetaTags = () => {
    const returnValue = [];

    const metaNameValues = fields?.metaNameValueList?.value
      ? fields?.metaNameValueList?.value.split('&')
      : '';

    if (metaNameValues.length > 0) {
      let i = 0;
      for (const val of metaNameValues) {
        const keyVal = val.split('=');
        returnValue.push(<meta key={i} name={keyVal[0]} content={keyVal[1]}></meta>);
        i++;
      }
    }
    return returnValue;
  };

  // Note, these tags need to be direct children of <Head> per NextJS docs.
  return (
    <>
      <Head>
        <title>{title}</title>

        {
          // Only render if specified
          fields?.canonicalUrl?.value?.href ? (
            <link rel="canonical" href={fields?.canonicalUrl?.value?.href} />
          ) : (
            <></>
          )
        }

        <meta name="description" content={fields?.metaDescription?.value} />
        <meta name="keywords" content={fields?.metaKeywords?.value} />
        <meta name="robots" content={robots} />

        {/* Add Name Value List Meta tag items */}
        {renderNameValueMetaTags()}

        {
          // Robots meta for coveo specifically
          !fields?.excludeFromSearch?.value ? (
            <meta name="coveobot" content="all" />
          ) : (
            <meta name="coveobot" content="noindex nofollow" />
          )
        }

        <meta name="featuredImage" content={fields?.openGraphImage?.value?.src} />
      </Head>

      <Head>
        {/* OG tags are the only common meta tags that use "property" instead of "name" */}
        <meta property="og:title" content={`${fields?.openGraphTitle?.value}`} />
        <meta property="og:description" content={fields?.openGraphDescription?.value} />
        <meta property="og:image" content={fields?.openGraphImage?.value?.src} />
        <meta property="og:url" content={fields?.openGraphUrl?.value?.href} />
      </Head>
    </>
  );
};

export default MetaData;
