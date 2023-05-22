import { getSampleRenderingContext } from 'lib/mocks/mock-placeholder';

const defaultData = {
  fields: {
    sectionId: {
      value: 'XupCardCollection',
    },
    cardsPerRow: {
      id: '1ef447f3-ed4f-4305-86c8-02b708063cae',
      url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Number-of-Cards/3',
      name: '3',
      displayName: '3',
      fields: {
        Value: {
          value: '3',
        },
      },
    },
    desktopDisplayStyle: {
      id: '0f556f3a-bbad-4aa5-952d-b79003b39cd6',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Heading-Levels/Heading-2',
      name: 'Horizontal Scroll',
      displayName: 'Horizontal Scroll',
      fields: {
        Value: {
          value: 'grid',
        },
      },
    },
    mobileDisplayStyle: {
      id: '0f556f3a-bbad-4aa5-952d-b79003b39cd6',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Heading-Levels/Heading-2',
      name: 'Grid',
      displayName: 'Grid',
      fields: {
        Value: {
          value: 'horizontal-scroll',
        },
      },
    },
    headlineText: {
      value: 'Xup Card Collection',
    },
    headlineLevel: {
      id: '0f556f3a-bbad-4aa5-952d-b79003b39cd6',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Heading-Levels/Heading-2',
      name: 'Heading 2',
      displayName: 'Heading 2',
      fields: {
        Value: {
          value: 'h2',
        },
      },
    },
    body: {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobor.',
    },
    cta1Style: {
      id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
      url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
      name: 'Link',
      displayName: 'Link',
      fields: {
        Value: {
          value: 'link',
        },
      },
    },
    cta1Icon: {
      id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
      name: 'Arrow',
      displayName: 'Arrow',
      fields: {
        Value: {
          value: 'arrow',
        },
      },
    },
    cta1Link: {
      value: {
        href: '/',
        text: 'Call to Action',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        querystring: '',
        id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
      },
    },
    alignment: {
      id: 'c6dc5505-a8a3-47e0-8b10-f01b2c03aa32',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Alignment/Left',
      name: 'Left',
      displayName: 'Left',
      fields: {
        Value: {
          value: 'left',
        },
      },
    },
    eventType: {
      value: '',
    },
    eventZone: {
      value: '',
    },
    eventName: {
      value: '',
    },
  },
  rendering: {
    dataSource: 'sampledatasource',
    componentName: 'XupCardCollection',
    placeholders: {
      cards: [
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
        {
          uid: 'daf4803e-4fe1-4267-becd-1e677bf4f8e3',
          componentName: 'GenericCard',
          dataSource: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
          fields: {
            cardEyebrow: {
              value: 'Eyebrow',
            },
            cardImageRatio: {
              id: 'fa9f0887-4da8-4c23-b731-98b823ea2fc2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Ratio/1-1',
              name: '1-1',
              displayName: '1-1',
              fields: {
                Value: {
                  value: '1/1',
                },
              },
            },
            mediaAsset: {
              id: '26d9ce7d-ea57-4cf8-90eb-0624e91f6ef7',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Media-Asset/Image',
              name: 'Image',
              displayName: 'Image',
              fields: {
                Value: {
                  value: 'image',
                },
              },
            },
            cardCTAIcon: {
              id: '50590edc-7ea7-4436-9a3e-701c87a07db2',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow',
              name: 'Arrow',
              displayName: 'Arrow',
              fields: {
                Value: {
                  value: 'arrow',
                },
              },
            },
            cardDescription: {
              value:
                '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>',
            },
            cardImage: {
              value: {
                src: '//Feature/EnterpriseWeb/Components/Cards/card-image.png?h=401&iar=0&w=602',
                alt: 'card image',
                width: '602',
                height: '401',
              },
            },
            cardCTA: {
              value: {
                href: '/',
                text: 'Call to Action',
                anchor: '',
                linktype: 'internal',
                class: '',
                title: '',
                target: '',
                querystring: '',
                id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
              },
            },
            cardHeading: {
              value: 'Card heading',
            },
            cardCTAStyle: {
              id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
              url: 'https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
              name: 'Link',
              displayName: 'Link',
              fields: {
                Value: {
                  value: 'link',
                },
              },
            },
            thumbnailImage: {
              value: {},
            },
            videoId: {
              value: '',
            },
            videoType: null,
            sitecore: {
              baseTemplateIds: [
                '{C153EC5E-57B3-4354-B86A-C2A8AD172B96}',
                '{309B2665-7F7B-4FF4-843E-17FB4CB5C403}',
              ],
              contentPath:
                '/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              displayName: 'Generic Card 1',
              fullPath:
                '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              fullUrl:
                'http://preview.local.andersenwindows.com/Data/Cards/Generic-Cards/Generic-Card-1',
              id: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
              itemUri: {
                databaseName: 'master',
                itemId: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                language: {
                  name: 'en',
                  originId: null,
                },
                path: '{DAF4803E-4FE1-4267-BECD-1E677BF4F8E3}',
                version: '1',
              },
              key: 'generic card 1',
              language: {
                name: 'en',
                originId: null,
              },
              layoutUrl: '/Data/Cards/Generic-Cards/Generic-Card-1',
              mediaUrl: '//DAF4803E4FE14267BECD1E677BF4F8E3.ashx',
              name: 'Generic Card 1',
              originalLanguage: {
                name: 'en',
                originId: null,
              },
              originatorId: '{00000000-0000-0000-0000-000000000000}',
              parentId: '{5B983EBA-4C9D-48CA-9EC4-D837F8D58B91}',
              path: '/sitecore/content/AndersenCorporation/AndersenWindows/AndersenWindows/Data/Cards/Generic Cards/Generic Card 1',
              templateId: '{C20BAA56-E054-467C-B2F9-BFB9DB10DB3E}',
              templateName: 'Generic Card',
              updated: false,
              url: '/Data/Cards/Generic-Cards/Generic-Card-1',
              version: 1,
            },
          },
        },
      ],
    },
  },
};

export default defaultData;
