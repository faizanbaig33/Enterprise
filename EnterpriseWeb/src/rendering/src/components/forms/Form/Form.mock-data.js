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
          id: "eb07fcde-fd5a-4e51-b3bc-9426a1ce5ed6",
          displayName: "Page 1",
          name: "Page 1",
          templateId: "c4442680-1100-4626-a469-acc318e25cbf",
          templateName: "Page",
          url: "/Data/Forms/Single-Form/Page-1",
          fields: {
            includeInSteps: {
              value: false
            },
            label: {
              value: "Page 1"
            },
            children: [
              {
                id: "8ce3ee66-51d3-4125-b673-64ec81351a28",
                displayName: "Headline",
                name: "Headline",
                templateId: "78e78e19-8b37-4637-8c04-9de221572d0d",
                templateName: "Headline",
                url: "/Data/Forms/Single-Form/Page-1/Headline",
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
                    value: "Headline"
                  }
                }
              },
              {
                id: "755fd39f-c5dc-44e2-92dd-f1c57261463d",
                displayName: "Paragraph",
                name: "Paragraph",
                templateId: "1e258863-055b-4c0d-b775-59541b0a90fd",
                templateName: "Paragraph",
                url: "/Data/Forms/Single-Form/Page-1/Paragraph",
                fields: {
                  text: {
                    value: "Lorem ipsum stuff here"
                  }
                }
              },
              {
                id: "1bdb2818-0846-4998-8a68-a9d0401a9be2",
                displayName: "Short Text",
                name: "Short Text",
                templateId: "4fd88841-d725-4815-8b03-6ea12c956c18",
                templateName: "Short Text",
                url: "/Data/Forms/Single-Form/Page-1/Short-Text",
                fields: {
                  maxLength: {
                    value: 5
                  },
                  minLength: {
                    value: 2
                  },
                  placeholderText: {
                    value: ""
                  },
                  defaultValue: {
                    value: "Default value"
                  },
                  label: {
                    value: "Short Text"
                  },
                  required: {
                    value: true
                  },
                  validations: [],
                  fieldMapping: null
                }
              },
              {
                id: "2bdb2818-0846-4998-8a68-a9d0401a9be2",
                displayName: "Email address",
                name: "Email address",
                templateId: "A1D62E74-51C3-4BDD-8547-1ECE87422EC9",
                templateName: "Email",
                url: "/Data/Forms/Single-Form/Page-1/Email-address",
                fields: {
                  maxLength: {
                    value: null
                  },
                  minLength: {
                    value: null
                  },
                  placeholderText: {
                    value: ""
                  },
                  label: {
                    value: "Email"
                  },
                  required: {
                    value: true
                  },
                  validations: [],
                  fieldMapping: null
                }
              },
              {
                id: "181f6d65-9671-4fd8-8484-d34a1bcdaacc",
                displayName: "Long Text",
                name: "Long Text",
                templateId: "62d234ca-1c65-4699-8bfe-339c28d92761",
                templateName: "Long Text",
                url: "/Data/Forms/Single-Form/Page-1/Long-Text",
                fields: {
                  defaultValue: {
                    value: "Other default value"
                  },
                  maxLength: {
                    value: null
                  },
                  minLength: {
                    value: 0
                  },
                  placeholderText: {
                    value: "Placeholder text"
                  },
                  rows: {
                    value: 5
                  },
                  label: {
                    value: "Long Text"
                  },
                  required: {
                    value: true
                  },
                  validations: [],
                  fieldMapping: null
                }
              },
              {
                id: "d96e2463-c348-4876-92eb-aef28923b606",
                displayName: "Hidden",
                name: "Hidden",
                templateId: "b01e7cae-d802-4ae5-9742-bdcda546554b",
                templateName: "Hidden",
                url: "/Data/Forms/Single-Form/Page-1/Hidden",
                fields: {
                  defaultValue: {
                    value: "2"
                  },
                  fieldMapping: {
                    id: "2f5aa35e-eee8-4cfc-a267-47791a562cfb",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Field-Mappings/Enabled-Plus/Form-Type",
                    name: "Form Type",
                    displayName: "Form Type",
                    fields: {
                      Value: {
                        value: "FormType"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  }
                }
              },
              {
                id: "a2c73b02-265e-4b21-932d-c465eb479578",
                displayName: "Button",
                name: "Button",
                templateId: "6dad441f-58d9-40a0-a119-c8d990b0484d",
                templateName: "Button",
                url: "/Data/Forms/Single-Form/Page-1/Button",
                fields: {
                  navigationStep: {
                    id: "b6185a15-c782-4ddf-8ad4-21620a8fe9d4",
                    url: "https://cm.local.ew.andersencorp.com/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Forms/Navigation-Steps/Submit",
                    name: "Submit",
                    displayName: "Submit",
                    fields: {
                      Value: {
                        value: "0"
                      }
                    },
                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                    templateName: "Enum"
                  },
                  label: {
                    value: "Button"
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
