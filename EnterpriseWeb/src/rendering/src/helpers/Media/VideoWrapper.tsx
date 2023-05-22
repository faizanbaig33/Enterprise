import React from 'react';
import { ItemExt } from 'lib/_.Sitecore.Override';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { SitecoreIds } from 'lib/constants';
import FacebookWrapper from './FacebookWrapper';
import VimeoWrapper from './VimeoWrapper';
import YoutubeWrapper from './YouTubeWrapper';

type VideoWrapperProps = {
  videoItem?: ItemExt;
};
const VideoWrapper = ({ videoItem }: VideoWrapperProps): JSX.Element => {
  if (!videoItem) {
    return <></>;
  }
  if (videoItem.templateId === SitecoreIds.Feature.Data.Elements.Videos.YouTubeVideo.TemplateId) {
    const videoProps = videoItem as Feature.EnterpriseWeb.Elements.Media.YouTubeVideo;
    return <YoutubeWrapper {...videoProps} />;
  } else if (
    videoItem.templateId === SitecoreIds.Feature.Data.Elements.Videos.FacebookVideo.TemplateId
  ) {
    const videoProps = videoItem as Feature.EnterpriseWeb.Elements.Media.FacebookVideo;
    return <FacebookWrapper {...videoProps} />;
  } else if (
    videoItem.templateId === SitecoreIds.Feature.Data.Elements.Videos.VimeoVideo.TemplateId
  ) {
    const videoProps = videoItem as Feature.EnterpriseWeb.Elements.Media.VimeoVideo;
    return <VimeoWrapper {...videoProps} />;
  } else {
    return <div>Unrecognized Video Type: {videoItem.templateName}</div>;
  }
};

export default VideoWrapper;
