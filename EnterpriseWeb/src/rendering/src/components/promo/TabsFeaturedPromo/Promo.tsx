// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { useTheme } from 'lib/context/ThemeContext';
// Components
import { Headline } from 'src/helpers/Headline';
import { Subheadline } from 'src/helpers/Subheadline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { ImagePrimary } from 'src/helpers/Media';
import SingleButton from 'src/helpers/SingleButton/SingleButton';
import classNames from 'classnames';
import { getEnum } from 'lib/utils';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { Caption } from 'src/helpers/Caption';

export type PromoProps = Feature.EnterpriseWeb.Elements.Tabs.TabContent & {
  classes: { [key: string]: string };
};

const Promo = (props: PromoProps) => {
  const { fields, classes } = props;

  const { themeName } = useTheme();

  if (!fields) return null;

  return (
    <>
      <div
        className={classNames(
          themeName === 'rba' && getEnum(fields.backgroundColor) === 'black'
            ? 'theme-black'
            : 'theme-gray',
          classes.promoContainer
        )}
      >
        <div className={classes.promoImageWrapper}>
          <ImagePrimary hideCaption={true} {...props} />
          {themeName === 'rba' && fields.primaryImageCaption.value && (
            <div className={classes.promoImageCaptionWrapper}>
              <div className={classes.promoImageCaption}>
                <Caption caption={fields.primaryImageCaption} />
              </div>
            </div>
          )}
        </div>
        <div className={classes.promoContentWrapper}>
          {themeName === 'rba' && <Eyebrow classes={classes.promoEyebrow} fields={fields} />}
          <Headline classes={classes.promoHeadline} fields={fields} />
          <Subheadline classes={classes.promoSubheadline} fields={fields} />
          <BodyCopy classes={classes.promoBody} fields={fields} />
          <SingleButton fields={fields} />
        </div>
      </div>
    </>
  );
};

export default Promo;
