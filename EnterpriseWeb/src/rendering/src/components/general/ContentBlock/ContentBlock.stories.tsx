// Global
import { Story, Meta } from '@storybook/react';

// Local
import ContentBlock, { ContentBlockProps } from './ContentBlock';
import defaultDataCenter from './ContentBlock.mock-data-center';
import defaultDataLeft from './ContentBlock.mock-data-left';
import defaultDataGray from './ContentBlock.mock-data-gray';

export default {
  title: 'General/ContentBlock',
  component: ContentBlock,
} as Meta;

const Template: Story<ContentBlockProps> = (props) => <ContentBlock {...props} />;

export const DefaultCenter = Template.bind({});
DefaultCenter.args = defaultDataCenter;

export const DefaultLeft = Template.bind({});
DefaultLeft.args = defaultDataLeft;

export const DefaultGray = Template.bind({});
DefaultGray.args = defaultDataGray;
