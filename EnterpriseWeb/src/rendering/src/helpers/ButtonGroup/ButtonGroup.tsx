import classNames from 'classnames';
import { Foundation } from 'src/.generated/Foundation.EnterpriseWeb.model';
import { Button } from '../Button';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type ButtonGroupProps = Foundation.EnterpriseWeb.Core.FieldSets.Cta1 &
  Foundation.EnterpriseWeb.Core.FieldSets.Cta2 & {
    classes: {
      wrapper: string;
      cta1Classes: string;
      cta2Classes: string;
    };
  };

const ButtonGroup = ({ fields, classes }: ButtonGroupProps): JSX.Element => {
  return (
    <div
      className={classNames(
        classes?.wrapper,
        'mb-s flex items-start md:flex-row md:items-center md:space-x-4'
      )}
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
          classes={classNames(classes?.cta1Classes, 'mr-m')}
        />
      )}
      {fields?.cta2Link && (
        <Button
          field={fields?.cta2Link}
          variant={fields?.cta2Style}
          icon={fields?.cta2Icon}
          modalId={
            (
              fields?.cta2Modal as unknown as Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal
            )?.fields?.modalId?.value
          }
          modalLinkText={fields?.cta2ModalLinkText}
          classes={classes?.cta2Classes}
        />
      )}
    </div>
  );
};

export default ButtonGroup;
