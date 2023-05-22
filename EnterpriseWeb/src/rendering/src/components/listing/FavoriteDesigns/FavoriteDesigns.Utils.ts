import { ButtonGroupProps } from 'src/helpers/ButtonGroup';
import { ImageToggleWrapperProps } from 'src/helpers/ImageToggleWrapper/ImageToggleWrapper';

export const getImageToggleData = (props: any): ImageToggleWrapperProps => {
  return {
    fields: {
      primaryImage: {
        value: {
          src: props.interiorImage.src,
          width: 387,
          height: 387,
        },
      },
      primaryImageMobile: {
        value: {
          src: props.interiorImage.src,
          width: 387,
          height: 387,
        },
      },
      secondaryImage: {
        value: {
          src: props.exteriorImage.src,
          width: 387,
          height: 387,
        },
      },
      secondaryImageMobile: {
        value: {
          src: props.exteriorImage.src,
          width: 387,
          height: 387,
        },
      },
    },
  };
};

export const getButtonGroupData = (props: any): Partial<ButtonGroupProps> => {
  return {
    fields: {
      cta1Style: {
        name: '',
        id: '',
        url: '',
        fields: {
          Value: {
            value: 'primary',
          },
        },
      },
      cta1Link: {
        value: {
          href: props.requestAQuoteUrl,
          linktype: 'internal',
          text: 'Get a quote',
          querystring: '',
          target: '',
          id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
        },
      },
      cta1Icon: {
        id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
        url: '',
        name: 'Arrow',
        displayName: 'Arrow',
        fields: {
          Value: {
            value: 'arrow',
          },
        },
        templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
        templateName: 'Enum',
      },
      cta1ModalLinkText: { value: '' },
      cta2Style: {
        name: '',
        url: '',
        id: '',
        fields: {
          Value: {
            value: 'link',
          },
        },
      },
      cta2Link: {
        value: {
          href: '/',
          linktype: 'internal',
          text: 'Edit design selections',
          querystring: '',
          target: '',
          id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
        },
      },
      cta2Icon: {
        id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
        url: '',
        name: 'Arrow',
        displayName: 'Arrow',
        fields: {
          Value: {
            value: 'arrow',
          },
        },
        templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
        templateName: 'Enum',
      },
      cta2ModalLinkText: { value: '' },
    },
  };
};
