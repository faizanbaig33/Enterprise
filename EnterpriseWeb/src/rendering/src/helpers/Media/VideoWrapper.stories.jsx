// Global
import { Story, Meta } from '@storybook/react';
// Local
import VideoWrapper from './VideoWrapper';
import { YoutubeData } from './VideoWrapper.mock-data';
import { FacebookData } from './VideoWrapper.mock-data';
import { VimeoData } from './VideoWrapper.mock-data';

export default {
  title: 'Authorable/General/Videos',
  component: VideoWrapper,
};

const Template = (props) => <VideoWrapper videoItem={props} />;

export const Youtube = Template.bind({});
Youtube.args = YoutubeData;

export const Facebook = Template.bind({});
Facebook.args = FacebookData;

export const Vimeo = Template.bind({});
Vimeo.args = VimeoData;