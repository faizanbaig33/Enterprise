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
  // border: '0',
  width: '100%',
  height: '100%',
};
export type YouTubeProps = Feature.EnterpriseWeb.Elements.Media.YouTubeVideo;

const YoutubeWrapper = (videoItem: YouTubeProps): JSX.Element => {
  // If the video has no value, return nothing - not sure if videoId is the best way to check this currently
  if (!videoItem.fields?.videoId) {
    return <></>;
  }

  const {
    videoHeight,
    videoWidth,
    videoId,
    // videoLazyLoad, // @TODO: implement this
    youTubeAutoLoop,
    youTubeShowControls,
    youTubeAutoPlay,
    youTubeDisableKeyboard,
    youTubeModestBranding,
    youTubeMute,
    // youTubeCaptions,
  } = videoItem.fields;
  const youtubeUrl = `https://www.youtube.com/embed/${videoId.value}?enablejsapi=1&loop=${
    youTubeAutoLoop.value ? 1 : 0
  }&controls=${youTubeShowControls.value ? 1 : 0}&autoplay=${
    youTubeAutoPlay.value ? 1 : 0
  }&disablekb=${youTubeDisableKeyboard.value ? 1 : 0}&modestbranding=${
    youTubeModestBranding.value ? 1 : 0
  }&mute=${youTubeAutoPlay.value ? 1 : youTubeMute.value}&playlist=${videoId.value}`;

  // &cc_load_policy=${youTubeCaptions.value ? 1 : 0}&cc_lang_pref=en

  return (
    <div style={container}>
      <iframe
        id={videoId.value}
        style={iframestyle}
        name="ytwrapper"
        width={videoWidth.value}
        height={videoHeight.value}
        src={youtubeUrl}
        title={'Youtube Video'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeWrapper;
