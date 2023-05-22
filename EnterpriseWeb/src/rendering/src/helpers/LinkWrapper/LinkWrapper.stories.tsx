// Global
import { Story, Meta } from '@storybook/react';

// Local
import LinkWrapper, { LinkWrapperProps } from './LinkWrapper';
import defaultData, { anchorLink } from './LinkWrapper.mock-data';

export default {
  title: 'Helpers/LinkWrapper',
  component: LinkWrapper,
} as Meta;

const Template: Story<LinkWrapperProps> = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-12">
      <div className="col-span-12 md:col-span-12">
        <LinkWrapper {...props} />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = defaultData;

export const anchorLinkData = Template.bind({});
anchorLinkData.args = anchorLink;
