import { NotifyTrigger as HeadlessNotifyTrigger } from '@coveo/headless';
import classNames from 'classnames';
import { useEffect, useState, FunctionComponent } from 'react';
import { BodyCopy } from 'src/helpers/BodyCopy';

interface TriggeredBannerProps {
  controller: HeadlessNotifyTrigger;
  triggeredBannerClasses?: string;
}

export const TriggeredBanner: FunctionComponent<TriggeredBannerProps> = (props) => {
  const { controller } = props;
  const [state, setState] = useState(controller.state);

  useEffect(() => controller.subscribe(() => updateState()), []);
  // useEffect(() => notify(), [state.notifications]);

  const updateState = () => {
    setState(props.controller.state);
  };

  return (
    <>
      {state.notifications.map((notification, index) => (
        <BodyCopy
          key={index}
          classes={classNames(props.triggeredBannerClasses, 'triggered-banner')}
          fields={{ body: { value: notification } }}
        />
      ))}
    </>
  );
};
