import { RichTextWrapper } from '../RichTextWrapper';
import { useExperienceEditor } from 'lib/utils';
import classNames from 'classnames';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { useTheme } from 'lib/context/ThemeContext';
import { CaptionTheme } from './Caption.theme';

export type CaptionProps = {
  caption?: Field<string> | undefined;
  classes?: string;
  italic?: boolean;
};

const Caption = ({ caption, classes, italic = true }: CaptionProps): JSX.Element => {
  const isEE = useExperienceEditor();
  const { themeData } = useTheme(CaptionTheme(italic));

  if (caption?.value == '' && !isEE) {
    return <></>;
  }

  classes = classNames(classes, themeData.classes.captionContainer);

  return <RichTextWrapper field={caption} refer="caption" className={classes} />;
};
export default Caption;
