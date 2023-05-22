// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeroBlogArticle, { HeroBlogArticleProps } from './HeroBlogArticle';
import defaultData from './HeroBlogArticle.mock-data';
import blackData from './HeroBlogArticle.mock-data-black';
import textOnlyFirstTenData from './HeroBlogArticle.mock-data-text-only-first';
import textOnlyCenterTenData from './HeroBlogArticle.mock-data-text-only-center';

export default {
  title: 'Hero/HeroBlogArticle',
  component: HeroBlogArticle,
} as Meta;
const Template: Story<HeroBlogArticleProps> = (props) => <HeroBlogArticle {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const Black = Template.bind({});
Black.args = blackData;

export const TextOnlyFirstTen = Template.bind({});
TextOnlyFirstTen.args = textOnlyFirstTenData;

export const TextOnlyCenterTen = Template.bind({});
TextOnlyCenterTen.args = textOnlyCenterTenData;
