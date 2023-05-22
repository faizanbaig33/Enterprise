import { Story, Meta } from '@storybook/react';

// Local
import ListHighlightAndCta, { ListHighlightAndCtaProps } from './ListHighlightAndCta';
import { linkIconData, defaultData } from './ListHighlightAndCta.mock-data';

export default {
  title: 'Listing/ListHighlightAndCta',
  component: ListHighlightAndCta,
} as Meta;

const Template: Story<ListHighlightAndCtaProps> = (props) => <ListHighlightAndCta {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const LinkIconData = Template.bind({});
LinkIconData.args = linkIconData;
