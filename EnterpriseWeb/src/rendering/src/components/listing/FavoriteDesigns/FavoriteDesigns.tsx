// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
// Components
import { Component } from 'src/helpers/Component';
// import { FavoriteDesignsTheme } from './FavoriteDesigns.theme';
import { getLocalStorageItem } from 'lib/utils/client-storage-utils';
import { useEffect, useRef, useState } from 'react';
import { Headline } from 'src/helpers/Headline';
import FavoriteDesignCard from './FavoriteDesignCard';
import { useExternalScript } from 'lib/utils/use-external-script';
import { SvgIcon } from 'src/helpers/SvgIcon';
import { hashCode } from 'src/helpers/Component/Component';
import { DesignProps } from './FavoriteDesigns.Types';

export type FavoriteDesignsProps =
  Feature.EnterpriseWeb.Components.Listing.Favorites.FavoriteDesigns;

const FavoriteDesigns = (props: FavoriteDesignsProps) => {
  const [designs, setDesigns] = useState<Array<DesignProps>>([]);
  const componentRef = useRef(null);

  const externalScript = 'https://static.addtoany.com/menu/page.js';
  const state = useExternalScript(externalScript);

  const { fields } = props;

  useEffect(() => {
    setDesigns(getLocalStorageItem('aw_favoritedesigns') as Array<DesignProps>);
  }, []);

  useEffect(() => {
    if (window.a2a_config) {
      window.a2a_config.onclick = 1;
      window.a2a_config.num_services = 8;
      window.a2a_config.templates = {
        email: {
          subject: 'Check out my Favorites from Andersen Windows',
          body: 'Link to my Favorites on AndersenWindows.com ${link}',
        },
        sms: {
          body: 'Link to my Favorites on AndersenWindows.com ${link}',
        },
      };
    }
  }, [state]);

  const printFavoriteDesigns = () => {
    const printContent = document.getElementById(
      fields?.sectionId?.value || `id${hashCode(props.rendering.dataSource)}`
    );
    const originalContents = document.body.innerHTML;

    if (printContent) {
      const notToBePrinted = printContent.querySelector('#print-icon');
      if (notToBePrinted) {
        notToBePrinted.remove();
      }

      document.body.innerHTML = printContent.innerHTML;
      window.print();

      document.body.innerHTML = originalContents;
    }
  };

  const getCreatedAtDate = (dateString: string): string => {
    console.log(dateString);
    const date = new Date(dateString);
    const locale = 'en-us';
    const weekday = date.toLocaleDateString(locale, { weekday: 'long' });
    const month = date.toLocaleDateString(locale, { month: 'long' });
    const day = date.toLocaleDateString(locale, { day: '2-digit' });
    const year = date.toLocaleDateString(locale, { year: 'numeric' });

    return `Created ${weekday} ${month}, ${day} ${year}`;
  };

  if (!fields) return null;

  return (
    <Component variant="lg" dataComponent="general/favoritedesigns" {...props}>
      <div className="col-span-12">
        <div className="flex justify-between">
          <Headline {...props} />
          <div
            id="print-icon"
            className="hidden cursor-pointer items-center justify-center text-primary md:flex"
            onClick={printFavoriteDesigns}
          >
            <SvgIcon icon="print" />
            <span className="ml-xxs">Print</span>
          </div>
        </div>
      </div>
      <div className="col-span-12" ref={componentRef}>
        {designs &&
          designs.length > 0 &&
          designs.map((designData) => {
            return (
              <>
                <span className="font-serif text-small">
                  {getCreatedAtDate(designData.createdDate)}
                </span>
                <div className="relative border border-gray">
                  <FavoriteDesignCard {...designData} />
                </div>
              </>
            );
          })}
      </div>
    </Component>
  );
};

export default withDatasourceCheck()<FavoriteDesignsProps>(FavoriteDesigns);
