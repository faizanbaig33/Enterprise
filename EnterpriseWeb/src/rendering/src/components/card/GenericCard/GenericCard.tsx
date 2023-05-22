// Components
import { Card } from 'src/helpers/Card';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { GenericCardTheme } from './GenericCard.theme';
import { getEnum } from 'lib/utils';
import { Image } from 'src/helpers/Media';
import { useTheme } from 'lib/context/ThemeContext';
import { Headline } from 'src/helpers/Headline';
import { BodyCopy } from 'src/helpers/BodyCopy';
import { Eyebrow } from 'src/helpers/Eyebrow';
import { SvgIcon } from 'src/helpers/Media';
import { Button } from 'src/helpers/Button';
import Link from 'next/link';
import { Subheadline } from 'src/helpers/Subheadline';

export type GenericCardProps = Feature.EnterpriseWeb.Cards.GenericCard;

export type TextAlignment = 'left' | 'center';

const GenericCard = (props: GenericCardProps): JSX.Element => {
  const alignment = getEnum<TextAlignment>(props.fields?.alignment) || 'left';
  const { themeData } = useTheme(GenericCardTheme(alignment));

  const showVideo =
    !!props.fields?.videoId &&
    !!props.fields?.videoType &&
    !!props.fields?.thumbnailImage?.value?.src;
  const showEyebrowLink = !!props.fields?.eyebrowLink?.value?.href;
  const showImage = !!props.fields?.image?.value?.src && !showVideo;
  const showIcon = !!props.fields?.iconSvg && !showVideo && !showImage;

  const svgIcon = props.fields?.iconSvg as unknown as Feature.EnterpriseWeb.Elements.Media.SvgIcon;

  return (
    <Card dataComponent="card/generic" {...props}>
      <div className={themeData.classes.cardWrapper}>
        {showVideo && <Image image={props.fields.thumbnailImage} />}
        {showImage && <Image image={props.fields.image} />}
        {showIcon && <SvgIcon svgIcon={svgIcon} className={themeData.classes.iconClass} />}
        <div className="flex grow flex-col">
          <div className={themeData.classes.copyWrapper}>
            {showEyebrowLink && (
              <Link href={props.fields.eyebrowLink.value.href}>
                <a className={themeData.classes.eyebrowLink}>
                  <Eyebrow classes={themeData.classes.eyebrow} {...props} />
                </a>
              </Link>
            )}
            {!showEyebrowLink && <Eyebrow classes={themeData.classes.eyebrow} {...props} />}
            <Headline defaultTag="h3" classes={themeData.classes.headline} {...props} />
            <Subheadline classes={themeData.classes.subheadline} {...props}></Subheadline>
            <BodyCopy classes={themeData.classes.body} {...props} />
          </div>
          <div className={themeData.classes.buttonGroupClass.wrapper}>
            <Button
              field={props.fields?.cta1Link}
              variant={props.fields?.cta1Style}
              icon={props.fields?.cta1Icon}
              classes={props.fields?.cta1Style}
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GenericCard;
