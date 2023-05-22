const defaultData = {
    rendering: {
        dataSource: 'sampledatasource',
        componentName: 'GenericModal',
      },
    "fields": {
        "modalSize": {
          "id": "fe6d9820-0dcd-4cfe-8f89-c2333d243470",
          "url": "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Generic-Modal-Size/Extra-Large",
          "name": "Extra Large",
          "displayName": "Extra Large",
          "fields": {
            "Value": {
              "value": "extra-large"
            }
          },
          "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
          "templateName": "Enum"
        },
        "componentSpacing": null,
        "sectionId": {
          "value": ""
        },
        "modalId": {
          "value": "genericModal1"
        },
        "eventName": {
          "value": ""
        },
        "eventType": {
          "value": ""
        },
        "eventZone": {
          "value": ""
        },
        "children": [
          {
            "id": "9b8d158e-f48b-4abb-b358-8f494834ec7c",
            "displayName": "Generic Modal Container",
            "name": "Generic Modal Container",
            "templateId": "8708e3f9-02fc-4f61-b8f8-b769317dbbc7",
            "templateName": "Generic Modal Container",
            "url": "/Data/Components/Generic-Modals/Generic-Modal-Extra-Large/Generic-Modal-Container",
            "fields": {},
            "placeholders": {
              "components": [
                {
                  "componentName": "PromoGeneric",
                  "uid": "8d0b5ef9-af0c-4874-9f8a-26483046665b",
                  "dataSource": "{8D0B5EF9-AF0C-4874-9F8A-26483046665B}",
                  "fields": {
                    "bottomCaptionDescription": {
                      "value": "\n<span id=\"fld_6649519182FE4419BC5C18EA73D49284_0C243F9602584CEFB0027280B78FB028_en_1_c13e08852c664e6fbd123704a2b98820_196365_edit\" sc_parameters=\"prevent-line-break=true\" class=\"scWebEditInput scEnabledChrome\" scfieldtype=\"single-line text\" scdefaulttext=\"[No text in field]\" sc-part-of=\"field\" scwatermark=\"true\" contenteditable=\"true\">Bottom description goes here and spans to two line text over here dummy text goes here</span>\n\n"
                    },
                    "bottomCaptionHeadline": {
                      "value": "Bottom top copy goes here and spans to two line text over here dummy text goes here"
                    },
                    "imageRatio": null,
                    "componentSpacing": null,
                    "sectionId": {
                      "value": ""
                    },
                    "imgPosition": {
                      "id": "0a58d643-e0c1-4a6e-a9f6-03d731a55121",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Position/Right",
                      "name": "Right",
                      "displayName": "Right",
                      "fields": {
                        "Value": {
                          "value": "right"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "headlineLevel": {
                      "id": "0f556f3a-bbad-4aa5-952d-b79003b39cd6",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Headline-Levels/Heading-2",
                      "name": "Heading 2",
                      "displayName": "Heading 2",
                      "fields": {
                        "Value": {
                          "value": "h2"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "headlineText": {
                      "value": "Headline text goes here  with right image 1:1 "
                    },
                    "superscriptCTA": {
                      "value": {
                        "href": ""
                      }
                    },
                    "eyebrowLevel": null,
                    "eyebrowText": {
                      "value": ""
                    },
                    "body": {
                      "value": "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
                    },
                    "cta1Icon": {
                      "id": "50590edc-7ea7-4436-9a3e-701c87a07db2",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow",
                      "name": "Arrow",
                      "displayName": "Arrow",
                      "fields": {
                        "Value": {
                          "value": "arrow"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "cta1Link": {
                      "value": {
                        "href": "/Demo-HeroTwoColumn",
                        "linktype": "internal",
                        "text": "Call to Action",
                        "querystring": "",
                        "target": "",
                        "id": "{0AF8C545-074B-466E-93CD-B14BF83DB353}"
                      }
                    },
                    "cta1Modal": null,
                    "cta1ModalLinkText": {
                      "value": ""
                    },
                    "cta1Style": {
                      "id": "49a23327-0397-4cce-a930-e76918d37c42",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Primary",
                      "name": "Primary",
                      "displayName": "Primary",
                      "fields": {
                        "Value": {
                          "value": "primary"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "primaryImage": {
                      "value": {
                        "src": "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Media/Images/Picture/photo-1581141849291-1125c7b692b5.jpg?h=900&iar=0&w=1600",
                        "alt": "Img",
                        "width": "1600",
                        "height": "900"
                      }
                    },
                    "primaryImageMobile": {
                      "value": {}
                    },
                    "primaryImageMobileFocusArea": null,
                    "primaryVideo": null,
                    "eventName": {
                      "value": ""
                    },
                    "eventType": {
                      "value": ""
                    },
                    "eventZone": {
                      "value": ""
                    }
                  }
                },
                {
                  "componentName": "PromoGeneric",
                  "uid": "8d0b5ef9-af0c-4874-9f8a-26483046665b",
                  "dataSource": "{8D0B5EF9-AF0C-4874-9F8A-26483046665B}",
                  "fields": {
                    "bottomCaptionDescription": {
                      "value": "\n<span id=\"fld_6649519182FE4419BC5C18EA73D49284_0C243F9602584CEFB0027280B78FB028_en_1_c13e08852c664e6fbd123704a2b98820_196365_edit\" sc_parameters=\"prevent-line-break=true\" class=\"scWebEditInput scEnabledChrome\" scfieldtype=\"single-line text\" scdefaulttext=\"[No text in field]\" sc-part-of=\"field\" scwatermark=\"true\" contenteditable=\"true\">Bottom description goes here and spans to two line text over here dummy text goes here</span>\n\n"
                    },
                    "bottomCaptionHeadline": {
                      "value": "Bottom top copy goes here and spans to two line text over here dummy text goes here"
                    },
                    "imageRatio": null,
                    "componentSpacing": null,
                    "sectionId": {
                      "value": ""
                    },
                    "imgPosition": {
                      "id": "0a58d643-e0c1-4a6e-a9f6-03d731a55121",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Image-Position/Right",
                      "name": "Right",
                      "displayName": "Right",
                      "fields": {
                        "Value": {
                          "value": "right"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "headlineLevel": {
                      "id": "0f556f3a-bbad-4aa5-952d-b79003b39cd6",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Headline-Levels/Heading-2",
                      "name": "Heading 2",
                      "displayName": "Heading 2",
                      "fields": {
                        "Value": {
                          "value": "h2"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "headlineText": {
                      "value": "Headline text goes here  with right image 1:1 "
                    },
                    "superscriptCTA": {
                      "value": {
                        "href": ""
                      }
                    },
                    "eyebrowLevel": null,
                    "eyebrowText": {
                      "value": ""
                    },
                    "body": {
                      "value": "<p><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
                    },
                    "cta1Icon": {
                      "id": "50590edc-7ea7-4436-9a3e-701c87a07db2",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Arrow",
                      "name": "Arrow",
                      "displayName": "Arrow",
                      "fields": {
                        "Value": {
                          "value": "arrow"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "cta1Link": {
                      "value": {
                        "href": "/Demo-HeroTwoColumn",
                        "linktype": "internal",
                        "text": "Call to Action",
                        "querystring": "",
                        "target": "",
                        "id": "{0AF8C545-074B-466E-93CD-B14BF83DB353}"
                      }
                    },
                    "cta1Modal": null,
                    "cta1ModalLinkText": {
                      "value": ""
                    },
                    "cta1Style": {
                      "id": "49a23327-0397-4cce-a930-e76918d37c42",
                      "url": "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Primary",
                      "name": "Primary",
                      "displayName": "Primary",
                      "fields": {
                        "Value": {
                          "value": "primary"
                        }
                      },
                      "templateId": "d2923fee-da4e-49be-830c-e27764dfa269",
                      "templateName": "Enum"
                    },
                    "primaryImage": {
                      "value": {
                        "src": "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Media/Images/Picture/photo-1581141849291-1125c7b692b5.jpg?h=900&iar=0&w=1600",
                        "alt": "Img",
                        "width": "1600",
                        "height": "900"
                      }
                    },
                    "primaryImageMobile": {
                      "value": {}
                    },
                    "primaryImageMobileFocusArea": null,
                    "primaryVideo": null,
                    "eventName": {
                      "value": ""
                    },
                    "eventType": {
                      "value": ""
                    },
                    "eventZone": {
                      "value": ""
                    }
                  }
                }
              ]
            }
          }

        ]
      }
};

export default defaultData;
