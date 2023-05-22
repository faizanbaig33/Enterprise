// Global
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Placeholder, RouteData, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import ModalWrapper, { ModalSize } from 'src/helpers/ModalWrapper/ModalWrapper';
import { useEffect, useState } from 'react';
import { useModalIdContext } from 'lib/context/GenericModalIDContext';
import { getEnum } from 'lib/utils';

export type GenericModalProps = Feature.EnterpriseWeb.Components.Modal.GenericModal.GenericModal & {
  fields: {
    children: RouteData[];
  };
} & ComponentProps;
const GenericModal = (props: GenericModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedModalId, setSelectedModalId, prevFocusedElementRef } = useModalIdContext();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedModalId('');
    prevFocusedElementRef?.current?.focus();
  };

  const modalSize = getEnum<ModalSize>(props.fields.modalSize) ?? 'large';

  useEffect(() => {
    if (selectedModalId) {
      selectedModalId === props.fields?.modalId.value && handleOpenModal();
    }
  }, [selectedModalId]);

  return (
    <div data-component="modal/genericmodal">
      {isModalOpen && (
        <ModalWrapper
          size={modalSize}
          handleClose={handleCloseModal}
          modalLabel={props.fields?.modalId.value}
        >
          {props.fields?.children?.map((childItem: RouteData, index: number) => {
            return (
              <Placeholder
                key={index}
                name="components"
                rendering={childItem}
                render={(childComponents) => {
                  return childComponents.map((component, index) => (
                    <div key={index}>{component}</div>
                  ));
                }}
              />
            );
          })}
        </ModalWrapper>
      )}
    </div>
  );
};

export default withDatasourceCheck()<GenericModalProps>(GenericModal);
