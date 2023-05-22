// Global
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import IframeResizer from 'iframe-resizer-react';
import { useTheme } from 'lib/context/ThemeContext';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

// Components
import { getEnum } from 'lib/utils';
import { Component } from 'src/helpers/Component';
import { ComponentBackgroundVariants } from 'src/helpers/Component/Component';
import { IframeTheme } from './Iframe.theme';

export type IframeProps = Feature.EnterpriseWeb.Components.General.Iframe.Iframe;

const ParseNameValuePairs = (source: string): Array<any> => {
  const returnValue: Array<any> = [];
  const parameters = source?.split('&');

  if (parameters?.length > 0) {
    parameters.forEach(function (x) {
      let splitX = [];
      splitX = x.split('=');

      if (splitX?.length > 1) {
        const obj: Record<string, string> = {};

        obj[splitX[0]] = splitX[1];
        returnValue.push([splitX[0], splitX[1]]);
      }
    });
  }
  return returnValue;
};

const GetIframeHtml = (parameters: Array<any>): JSX.Element => {
  const iframeResizerProps: { [index: string]: any } = {};

  if (parameters) {
    parameters.forEach((x) => x);
    for (const i in parameters) {
      const currentParameter = parameters[i];
      const currentParameterKey = currentParameter[0] as string;
      const currentParameterValue = currentParameter[1] as string;
      if (iframeResizerProps[currentParameterKey] === undefined) {
        iframeResizerProps[currentParameterKey] = currentParameterValue;
      }
    }
  }

  const iFrameElement = IframeResizer(iframeResizerProps);

  return <>{iFrameElement}</>;
};

const Iframe = (props: IframeProps) => {
  const { themeData } = useTheme(IframeTheme());
  const style = getEnum<ComponentBackgroundVariants>(props.fields?.backgroundColor) ?? 'white';

  const resizerOptions = ParseNameValuePairs(props?.fields?.iframeResizerOptions?.value);
  const iframeAttributes = ParseNameValuePairs(props?.fields?.iframeAttributes?.value);
  let finalIframeAttributes: Array<any> = [
    ['className', themeData.classes.iframeContainerClass],
    ['src', props?.fields?.iframeUrl?.value],
  ];

  try {
    if (resizerOptions?.length > 0) {
      finalIframeAttributes = finalIframeAttributes.concat(resizerOptions);
    }

    if (iframeAttributes?.length > 0) {
      finalIframeAttributes = finalIframeAttributes.concat(iframeAttributes);
    }
  } catch {}

  return (
    <Component
      variant="full"
      backgroundVariant={style}
      padding=" "
      dataComponent="general/iframe"
      {...props}
    >
      {GetIframeHtml(finalIframeAttributes)}
    </Component>
  );
};

export default withDatasourceCheck()<IframeProps>(Iframe);
