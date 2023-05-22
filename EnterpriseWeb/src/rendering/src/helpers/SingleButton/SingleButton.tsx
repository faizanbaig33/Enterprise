import classNames from 'classnames';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { Button } from '../Button';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type SingleButtonProps = Foundation.EnterpriseWeb.Core.FieldSets.Cta1 & {
  classes?: {
    wrapper?: string;
    cta1Classes?: string;
  };
};

const SingleButton = ({ fields, classes }: SingleButtonProps): JSX.Element => {
  return (
    <div
      className={classNames(classes?.wrapper, 'mb-s flex items-start md:flex-row md:items-center')}
    >
      {fields?.cta1Link && (
        <Button
          field={fields?.cta1Link}
          variant={fields?.cta1Style}
          icon={fields?.cta1Icon}
          modalId={
            (
              fields?.cta1Modal as unknown as Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal
            )?.fields?.modalId?.value
          }
          modalLinkText={fields?.cta1ModalLinkText}
          classes={classNames(classes?.cta1Classes)}
        />
      )}
    </div>
  );
};

export default SingleButton;
