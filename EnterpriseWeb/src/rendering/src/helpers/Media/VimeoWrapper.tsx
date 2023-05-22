// Global
import { CSSProperties } from 'react';
// Local
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

const container: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  paddingTop: '56.25%',
};

const iframestyle: CSSProperties = {
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  width: '100%',
  height: '100%',
};

export type VimeoProps = Feature.EnterpriseWeb.Elements.Media.VimeoVideo;

const VimeoWrapper = (videoItem: VimeoProps): JSX.Element => {
  // If the video has no value, return nothing - not sure if videoId is the best way to check this currently
  if (!videoItem.fields?.videoId) {
    return <></>;
  }

  const {
    videoHeight,
    videoWidth,
    videoId,
    // videoLazyLoad, // @TODO: implement this
    vimeoAutoPause,
    vimeoAutoPlay,
    vimeoBackground,
    vimeoByline,
    vimeoColor,
    // vimeoControls, // this is currently breaking things for some reason
    vimeoDNT,
    vimeoKeyboard,
    vimeoLoop,
    vimeoMuted,
    vimeoPictureInPicture,
    vimeoPlaysInline,
  } = videoItem.fields;

  const vimeoUrl = `https://player.vimeo.com/video/${videoId.value}?portrait=0&autopause=${vimeoAutoPause.value}&autoplay=${vimeoAutoPlay.value}&background=${vimeoBackground.value}&byline=${vimeoByline.value}&color=${vimeoColor.value}&dnt=${vimeoDNT.value}&keyboard=${vimeoKeyboard.value}&loop=${vimeoLoop.value}&muted=${vimeoMuted.value}&pip=${vimeoPictureInPicture.value}&playsinline=${vimeoPlaysInline.value}`;

  return (
    <div style={container}>
      <iframe
        style={iframestyle}
        src={vimeoUrl}
        width={videoWidth.value || '640'}
        height={videoHeight.value || '360'}
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
      ></iframe>
    </div>
  );
};

export default VimeoWrapper;
