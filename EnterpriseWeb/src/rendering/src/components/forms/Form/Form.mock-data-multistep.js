const defaultData = {
    rendering: {
      dataSource: "sampledatasource",
      componentName: "Form",
    },
    uid: "24d4ed52-6782-403a-aa81-56d62c5fbcba",
    componentName: "Form",
    dataSource: "{C4F28335-FB0D-4DCD-98B5-42AC46F4A2B5}",
    fields:{
      children: [
        {
          id: "8dc3ff7f-f96b-4597-805a-a0bc3b4be44a",
          displayName: "Form Page",
          name: "Form Page",
          templateId: "c4442680-1100-4626-a469-acc318e25cbf",
          templateName: "Page",
          url: "/Data/Forms/Test-Form/Form-Page",
          fields: {
            includeInSteps: {
              value: true
            },
            label: {
              value: "Step 1"
            },
            children: [
              {
                id: "acbf0a81-7c9e-430c-b484-ada66a2c1c96",
                displayName: "Headline",
                name: "Headline",
                templateId: "78e78e19-8b37-4637-8c04-9de221572d0d",
                templateName: "Headline",
                url: "/Data/Forms/Test-Form/Form-Page/Headline",
                fields: {
                  headlineLevel: {
                    id: "0f556f3a-bbad-4aa5-952d-b79003b39cd6",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Headline-Levels/Heading-2",
                    name: "Heading 2",
                    displayName: "Heading 2",
                    fields: {
                      Value: {
                        value: "h2"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  superscriptCTA: {
                    value: {
                      href: ""
                    }
                  },
                  headlineText: {
                    value: "This is the Test Form"
                  },
                  children: []
                }
              },
              {
                id: "be4e5ca5-5297-4932-9fd9-265d024e1c1a",
                displayName: "Form Intro",
                name: "Form Intro",
                templateId: "1e258863-055b-4c0d-b775-59541b0a90fd",
                templateName: "Paragraph",
                url: "/Data/Forms/Test-Form/Form-Page/Form-Intro",
                fields: {
                  text: {
                    value: "Here is some rich text form intro copy"
                  },
                  children: []
                }
              },
              {
                id: "7896f125-b041-4edc-b237-04dcd6d49eca",
                displayName: "First Name",
                name: "First Name",
                templateId: "4fd88841-d725-4815-8b03-6ea12c956c18",
                templateName: "Short Text",
                url: "/Data/Forms/Test-Form/Form-Page/First-Name",
                fields: {
                  maxLength: {
                    value: 255
                  },
                  minLength: {
                    value: 0
                  },
                  placeholderText: {
                    value: "Enter your first name"
                  },
                  defaultValue: {
                    value: ""
                  },
                  label: {
                    value: "First Name"
                  },
                  required: {
                    value: true
                  },
                  validations: [],
                  fieldMapping: {
                    id: "e17a5ecb-bbe1-4d26-9a55-625d19b375ee",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Field-Mappings/Enabled-Plus/First-Name",
                    name: "First Name",
                    displayName: "First Name",
                    fields: {
                      Value: {
                        value: "FirstName"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  children: []
                }
              },
              {
                id: "efd220ce-75db-41aa-9714-1cbebef4054f",
                displayName: "Windows Problems",
                name: "Windows Problems",
                templateId: "62d234ca-1c65-4699-8bfe-339c28d92761",
                templateName: "Long Text",
                url: "/Data/Forms/Test-Form/Form-Page/Windows-Problems",
                fields: {
                  defaultValue: {
                    value: "This is a default value"
                  },
                  maxLength: {
                    value: null
                  },
                  minLength: {
                    value: 0
                  },
                  placeholderText: {
                    value: ""
                  },
                  rows: {
                    value: 5
                  },
                  label: {
                    value: "Long Text"
                  },
                  required: {
                    value: false
                  },
                  validations: [],
                  fieldMapping: {
                    id: "2954da41-3a5c-4658-8edb-a597fa5f9a6d",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Field-Mappings/Enabled-Plus/Windows-Problems",
                    name: "Windows Problems",
                    displayName: "Windows Problems",
                    fields: {
                      Value: {
                        value: "WindowsProblems"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  children: []
                }
              },
              {
                id: "3866d094-39b9-4eb7-937b-7eaf67192c8c",
                displayName: "Go Forward",
                name: "Go Forward",
                templateId: "6dad441f-58d9-40a0-a119-c8d990b0484d",
                templateName: "Button",
                url: "/Data/Forms/Test-Form/Form-Page/Go-Forward",
                fields: {
                  navigationStep: {
                    id: "289fe73e-e947-4b59-a53a-6bfbf997dd45",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Navigation-Steps/Next",
                    name: "Next",
                    displayName: "Next",
                    fields: {
                      Value: {
                        value: "1"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  label: {
                    value: "Go Forward"
                  },
                  children: []
                }
              }
            ]
          }
        },
        {
          id: "b99d23e5-cbbe-4e4f-9b97-bc61e2e47ca4",
          displayName: "Form Page 2",
          name: "Form Page 2",
          templateId: "c4442680-1100-4626-a469-acc318e25cbf",
          templateName: "Page",
          url: "/Data/Forms/Test-Form/Form-Page-2",
          fields: {
            includeInSteps: {
              value: true
            },
            label: {
              value: "Step 2"
            },
            children: [
              {
                id: "d2cc647b-a912-467d-9ace-aa01e3cffa2d",
                displayName: "Headline",
                name: "Headline",
                templateId: "78e78e19-8b37-4637-8c04-9de221572d0d",
                templateName: "Headline",
                url: "/Data/Forms/Test-Form/Form-Page-2/Headline",
                fields: {
                  headlineLevel: {
                    id: "0f556f3a-bbad-4aa5-952d-b79003b39cd6",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Headline-Levels/Heading-2",
                    name: "Heading 2",
                    displayName: "Heading 2",
                    fields: {
                      Value: {
                        value: "h2"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  superscriptCTA: {
                    value: {
                      href: ""
                    }
                  },
                  headlineText: {
                    value: "This is the Test Form"
                  },
                  children: []
                }
              },
              {
                id: "0094025b-dccc-4edc-9a33-2c7505d3fb4e",
                displayName: "Form Intro",
                name: "Form Intro",
                templateId: "1e258863-055b-4c0d-b775-59541b0a90fd",
                templateName: "Paragraph",
                url: "/Data/Forms/Test-Form/Form-Page-2/Form-Intro",
                fields: {
                  text: {
                    value: "Here is some rich text form intro copy"
                  },
                  children: []
                }
              },
              {
                id: "c2d73a68-28e0-4f56-be03-0606228b7dea",
                displayName: "Short Text",
                name: "Short Text",
                templateId: "4fd88841-d725-4815-8b03-6ea12c956c18",
                templateName: "Short Text",
                url: "/Data/Forms/Test-Form/Form-Page-2/Short-Text",
                fields: {
                  maxLength: {
                    value: 255
                  },
                  minLength: {
                    value: 0
                  },
                  placeholderText: {
                    value: "Enter your first name"
                  },
                  defaultValue: {
                    value: ""
                  },
                  label: {
                    value: "First Name"
                  },
                  required: {
                    value: true
                  },
                  validations: [],
                  fieldMapping: null,
                  children: []
                }
              },
              {
                id: "fc70d11c-9a41-42f7-b95b-514276972ebb",
                displayName: "Long Text",
                name: "Long Text",
                templateId: "62d234ca-1c65-4699-8bfe-339c28d92761",
                templateName: "Long Text",
                url: "/Data/Forms/Test-Form/Form-Page-2/Long-Text",
                fields: {
                  defaultValue: {
                    value: ""
                  },
                  maxLength: {
                    value: null
                  },
                  minLength: {
                    value: 0
                  },
                  placeholderText: {
                    value: ""
                  },
                  rows: {
                    value: 5
                  },
                  label: {
                    value: "Long Text"
                  },
                  required: {
                    value: false
                  },
                  validations: [],
                  fieldMapping: null,
                  children: []
                }
              },
              {
                id: "432798cc-208b-42bf-91bc-814ef4ea1937",
                displayName: "Go Back",
                name: "Go Back",
                templateId: "6dad441f-58d9-40a0-a119-c8d990b0484d",
                templateName: "Button",
                url: "/Data/Forms/Test-Form/Form-Page-2/Go-Back",
                fields: {
                  navigationStep: {
                    id: "2847b5eb-514d-4b93-8c7a-4d94d592a9e1",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Navigation-Steps/Previous",
                    name: "Previous",
                    displayName: "Previous",
                    fields: {
                      Value: {
                        value: "-1"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  label: {
                    value: "Go Back"
                  },
                  children: []
                }
              },
              {
                id: "28d29f88-6350-4f3f-9f9a-de47cb77c5b5",
                displayName: "Go Forward",
                name: "Go Forward",
                templateId: "6dad441f-58d9-40a0-a119-c8d990b0484d",
                templateName: "Button",
                url: "/Data/Forms/Test-Form/Form-Page-2/Go-Forward",
                fields: {
                  navigationStep: {
                    id: "289fe73e-e947-4b59-a53a-6bfbf997dd45",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Navigation-Steps/Next",
                    name: "Next",
                    displayName: "Next",
                    fields: {
                      Value: {
                        value: "1"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  label: {
                    value: "Submit"
                  },
                  children: [
                    {
                      id: "4b9a2c25-324c-48ad-9463-ae2b62db72e7",
                      displayName: "Stand In Submit Action",
                      name: "Stand In Submit Action",
                      templateId: "a87a00b1-e6db-45ab-8b54-636fec3b5523",
                      templateName: "Folder",
                      url: "/Data/Forms/Test-Form/Form-Page-2/Go-Forward/Stand-In-Submit-Action",
                      fields: {}
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          id: "df13811d-79bf-4c9d-a840-d9e802f14840",
          displayName: "Thank You Page",
          name: "Thank You Page",
          templateId: "c4442680-1100-4626-a469-acc318e25cbf",
          templateName: "Page",
          url: "/Data/Forms/Test-Form/Thank-You-Page",
          fields: {
            includeInSteps: {
              value: false
            },
            label: {
              value: "Thank You Page"
            },
            children: [
              {
                id: "45d23a12-fb58-4b36-882e-95c8c5a1acfa",
                displayName: "Thank You Messaging",
                name: "Thank You Messaging",
                templateId: "1e258863-055b-4c0d-b775-59541b0a90fd",
                templateName: "Paragraph",
                url: "/Data/Forms/Test-Form/Thank-You-Page/Thank-You-Messaging",
                fields: {
                  text: {
                    value: "Thank you for submitting!"
                  },
                  children: []
                }
              },
              {
                id: "09a523ec-f156-4431-82e2-05aa3dbd6fbb",
                displayName: "Go Back",
                name: "Go Back",
                templateId: "6dad441f-58d9-40a0-a119-c8d990b0484d",
                templateName: "Button",
                url: "/Data/Forms/Test-Form/Thank-You-Page/Go-Back",
                fields: {
                  navigationStep: {
                    id: "2847b5eb-514d-4b93-8c7a-4d94d592a9e1",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Navigation-Steps/Previous",
                    name: "Previous",
                    displayName: "Previous",
                    fields: {
                      Value: {
                        value: "-1"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  label: {
                    value: "Go Back"
                  },
                  children: []
                }
              }
            ]
          }
        }
      ]
    }
  };
export default defaultData;
