const defaultData = {
    rendering: {
        dataSource: 'sampledatasource',
        componentName: 'AWHeader',
    },
    
        fields: {
          componentSpacing: null,
          sectionId: {
            value: ""
          },
          logo: {
            value: {
              src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/shared/Logo/ANDERSEN_Logo_TM_Rectangle_RGB.png?h=272&iar=0&w=1926",
              alt: "Andersen Windows Logo",
              width: "1926",
              height: "272"
            }
          },
          logoCTA: {
            value: {
              href: "/",
              text: "Andersen Windows",
              anchor: "",
              linktype: "internal",
              class: "",
              title: "",
              target: "",
              querystring: "",
              id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
            }
          },
          secondaryLogo: {
            value: {}
          },
          secondaryLogoCTA: {
            value: {
              href: ""
            }
          },
          standaloneSearchBox: {
            id: "d939bb53-1e25-415b-8b65-4b9d366ef0fc",
            url: "/Data/Elements/Search/Standalone-Search-Box/Standalone-Search-Box",
            name: "Standalone Search Box",
            displayName: "Standalone Search Box",
            fields: {
              placeholderText: {
                value: "What can we help you find?"
              },
              redirectionUrl: {
                value: {
                  href: "/Search",
                  text: "",
                  anchor: "",
                  linktype: "internal",
                  class: "",
                  title: "",
                  target: "",
                  querystring: "",
                  id: "{CAFF4F26-97F0-417B-90FF-31BFE28C513F}"
                }
              },
              queryPipeline: {
                value: "default"
              },
              searchHub: {
                value: "search"
              },
              numberOfSuggestions: {
                value: 5
              },
              showSuggestions: {
                value: true
              },
              suggestedResultsLabel: {
                value: "Suggested Results"
              },
              numberOfSuggestedResults: {
                value: 3
              },
              showSuggestedResults: {
                value: true
              }
            },
            templateId: "32154a4b-a94b-4576-bb0e-130da0aed393",
            templateName: "Standalone Search Box"
          },
          utilityLogo: {
            value: {}
          },
          utilityLogoCTA: {
            value: {
              href: ""
            }
          },
          eventName: {
            value: ""
          },
          eventType: {
            value: ""
          },
          eventZone: {
            value: ""
          },
          children: [
            {
              id: "4e5f7c0a-16c9-4dd0-a43e-16b3ab7fc8a1",
              displayName: "Main Menu",
              name: "Main Menu",
              templateId: "905c7f52-d418-43cb-834c-bc033560bc4d",
              templateName: "Nav Menu",
              url: "/Data/Components/Navigation/AW-Header/Main-Menu",
              fields: {
                menuTitle: {
                  value: "mainMenu"
                },
                children: [
                  {
                    id: "ed9ebc26-b7bf-4900-b995-64763cc44a39",
                    displayName: "Windows Doors",
                    name: "Windows Doors",
                    templateId: "c162167b-e548-48b6-b09b-63cfbeb5d0f6",
                    templateName: "Nav Group",
                    url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors",
                    fields: {
                      navGroupTitle: {
                        value: "Windows & Doors"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: [
                        {
                          id: "b89677bb-8bac-4208-b3f8-454c968581af",
                          displayName: "Explore windows",
                          name: "Explore windows",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Explore windows",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: [
                              {
                                id: "220a698e-8b7b-4378-994d-e8fa94d26813",
                                displayName: "Awning",
                                name: "Awning",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Awning",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Awning",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "a0cc4b37-f700-4a5d-9da7-b95a7f18c1e4",
                                displayName: "Bay bow",
                                name: "Bay bow",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Bay-bow",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Bay & bow",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "beb77894-19e6-41b8-8c1b-93260b59263c",
                                displayName: "Casement",
                                name: "Casement",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Casement",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Casement",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "ca2a0a14-038c-4679-b897-87f981c32220",
                                displayName: "Double single hung",
                                name: "Double single hung",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Double-single-hung",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Double & single hung",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "f2d86399-13ef-4802-96f7-03c87003ce92",
                                displayName: "Gliding",
                                name: "Gliding",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Gliding",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Gliding",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "0689b60d-1f2c-49fc-87c5-3459c9689673",
                                displayName: "Pass-through",
                                name: "Pass-through",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Pass-through",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Pass-through",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "e35523cb-4fa5-4855-bc6e-0495faf71d4c",
                                displayName: "Picture",
                                name: "Picture",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Picture",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Picture",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "f9a4f2b1-9042-4a9b-8d0f-b73acce21435",
                                displayName: "Specialty shapes",
                                name: "Specialty shapes",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Specialty-shapes",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Specialty shapes",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "4c3290fe-fdc6-40d5-8137-7f3ef9641f38",
                                displayName: "See all",
                                name: "See all",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/See-all",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {}
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "See all",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                                    name: "Bold Black",
                                    displayName: "Bold Black",
                                    fields: {
                                      Value: {
                                        value: "bold-black"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "9f2ac463-e347-4113-8843-5d548beca2bf",
                                displayName: "Separator",
                                name: "Separator",
                                templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                                templateName: "Separator",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Separator",
                                fields: {
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              },
                              {
                                id: "415462ab-2010-40ed-ae6f-39574eb2def8",
                                displayName: "Replacement windows",
                                name: "Replacement windows",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-windows/Replacement-windows",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {}
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Replacement Windows",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          id: "2be06d94-3be7-453d-a647-c4ac635deaa5",
                          displayName: "Explore doors",
                          name: "Explore doors",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-doors",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Explore doors",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: [
                              {
                                id: "7c99e2a2-b1b7-413e-b934-fb0b9d88547c",
                                displayName: "Big doors",
                                name: "Big doors",
                                templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                                templateName: "Nav Item",
                                url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Explore-doors/Big-doors",
                                fields: {
                                  navItemIcon: null,
                                  navItemImage: {
                                    value: {
                                      src: "https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/AndersenWindows/Entry_Door.png?h=900&iar=0&w=900",
                                      alt: "Entry_Door",
                                      width: "900",
                                      height: "900"
                                    }
                                  },
                                  navItemLink: {
                                    value: {
                                      href: "/",
                                      text: "Big doors",
                                      anchor: "",
                                      linktype: "internal",
                                      class: "",
                                      title: "",
                                      target: "",
                                      querystring: "",
                                      id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                                    }
                                  },
                                  navItemStyle: {
                                    id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                                    name: "Grey",
                                    displayName: "Grey",
                                    fields: {
                                      Value: {
                                        value: "grey"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  displayType: {
                                    id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                                    url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                                    name: "Desktop And Mobile",
                                    displayName: "Desktop And Mobile",
                                    fields: {
                                      Value: {
                                        value: "desktop-and-mobile"
                                      }
                                    },
                                    templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                                    templateName: "Enum"
                                  },
                                  mobileSortOrder: {
                                    value: null
                                  }
                                }
                              }
                            ]
                          }
                        },
                        {
                          id: "473d567e-6555-49f6-a0ad-2219db6b9d52",
                          displayName: "See all",
                          name: "See all",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/See-all",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "See all",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "1d974be8-0566-4524-96c1-8c47747c1595",
                          displayName: "Top Separator",
                          name: "Top Separator",
                          templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                          templateName: "Separator",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Top-Separator",
                          fields: {
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "9f7fe1da-2376-47ce-8cc0-e520b6bc6f39",
                          displayName: "Browse by materials",
                          name: "Browse by materials",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Browse-by-materials",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/ListImagewithCallouts",
                                text: "Browse by materials",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{5C39C5D7-AE28-47E8-904D-302346BB733E}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "c095c887-cad5-4e7c-8a17-d6b727b98533",
                          displayName: "Browse by series",
                          name: "Browse by series",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Browse-by-series",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/Generic-Page",
                                text: "Browse by series",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{C07D62B2-F901-4D63-952A-9E876923536F}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "f39123a5-54b7-4a22-890e-ad38dfb5ca37",
                          displayName: "Options accessories",
                          name: "Options accessories",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Options-accessories",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/Generic-Page-Mashup-2",
                                text: "Options accessories",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{5197B9F0-9D38-4C4E-B364-F9DAEE41F5DA}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "e89d8ceb-804e-425d-9360-fc8f6e76b1d8",
                          displayName: "Castal impact window doors",
                          name: "Castal impact window doors",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Castal-impact-window-doors",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/PromoGeneric1",
                                text: "Castal impact window doors",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7C623537-B6C3-4CD2-BA3D-B6814A9FBA63}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "a746dfd4-9def-4adc-b64b-84f8fd636215",
                          displayName: "Bottom Separator",
                          name: "Bottom Separator",
                          templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                          templateName: "Separator",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Bottom-Separator",
                          fields: {
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "0118841e-4f9b-48ec-887f-4f61e1792d18",
                          displayName: "Find your PERFECT MATCH",
                          name: "Find your PERFECT MATCH",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Find-your-PERFECT-MATCH",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/ListImagewithCallouts",
                                text: "Find your PERFECT MATCH",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{5C39C5D7-AE28-47E8-904D-302346BB733E}"
                              }
                            },
                            navItemStyle: {
                              id: "c17fd758-dba0-4859-aafe-c4a5d9828923",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-With-Colored-Text",
                              name: "Bold With Colored Text",
                              displayName: "Bold With Colored Text",
                              fields: {
                                Value: {
                                  value: "bold-with-colored-text"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "2c23f3b3-5aa4-4f39-b795-a3b712c59f3b",
                          displayName: "Design a window or door",
                          name: "Design a window or door",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Windows-Doors/Design-a-window-or-door",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "http://",
                                text: "Design a window or door",
                                linktype: "external",
                                url: "",
                                anchor: "",
                                target: ""
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        }
                      ]
                    }
                  },
                  {
                    id: "3a23f1a0-35c0-4a6e-a0b3-3bee1dd14d21",
                    displayName: "Inspiration",
                    name: "Inspiration",
                    templateId: "c162167b-e548-48b6-b09b-63cfbeb5d0f6",
                    templateName: "Nav Group",
                    url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration",
                    fields: {
                      navGroupTitle: {
                        value: "Design Ideas"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: [
                        {
                          id: "45eae4ee-aab4-4a52-bce3-863cb97c8b49",
                          displayName: "Blog",
                          name: "Blog",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration/Blog",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Blog",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "cbd7ad59-b7e4-4c30-8f3a-d22a8ee95678",
                          displayName: "Featured Projects",
                          name: "Featured Projects",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration/Featured-Projects",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Featured Projects",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "f045662e-2c3a-4bf1-a6a1-eab400227161",
                          displayName: "Separator",
                          name: "Separator",
                          templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                          templateName: "Separator",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration/Separator",
                          fields: {
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "52599f22-2c0d-47fb-89a9-70bb6866a8be",
                          displayName: "Find your PERFECT MATCH",
                          name: "Find your PERFECT MATCH",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration/Find-your-PERFECT-MATCH",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Find your <span style=\"color: #F85E2D\">PERFECT</span> MATCH",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "c17fd758-dba0-4859-aafe-c4a5d9828923",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-With-Colored-Text",
                              name: "Bold With Colored Text",
                              displayName: "Bold With Colored Text",
                              fields: {
                                Value: {
                                  value: "bold-with-colored-text"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "0a947cb4-65c8-4e85-96d2-2ef79d1a48bf",
                          displayName: "Design a window or door",
                          name: "Design a window or door",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Inspiration/Design-a-window-or-door",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Design a window or door",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        }
                      ]
                    }
                  },
                  {
                    id: "c66b112a-19eb-444a-bd5a-47ae222a4b2a",
                    displayName: "Parts Support",
                    name: "Parts Support",
                    templateId: "c162167b-e548-48b6-b09b-63cfbeb5d0f6",
                    templateName: "Nav Group",
                    url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support",
                    fields: {
                      navGroupTitle: {
                        value: "Parts & Support"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: [
                        {
                          id: "704539e3-b583-4a53-94fb-1b781dc3367f",
                          displayName: "Parts store",
                          name: "Parts store",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support/Parts-store",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Parts Store",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "169ee667-7fd7-4cdd-933e-ebdd2e976eb1",
                          displayName: "Product Support",
                          name: "Product Support",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support/Product-Support",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Product Support",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "cdb84ea9-3a30-4fe6-bd32-98835dcbb0a0",
                          displayName: "Separator",
                          name: "Separator",
                          templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                          templateName: "Separator",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support/Separator",
                          fields: {
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "7bb34f70-5399-4f66-865d-5e7098ae8143",
                          displayName: "Parts Catalog",
                          name: "Parts Catalog",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support/Parts-Catalog",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/PromoGeneric",
                                text: "Parts catalog",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{4759E204-D0FC-43F8-80BB-E0C0B94D9F65}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "91bf7235-a5c1-43f6-9dc6-dfc94c5dbb6a",
                          displayName: "Warranties",
                          name: "Warranties",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/Parts-Support/Warranties",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Warranties",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "12aa5683-85c7-46d2-b0b7-cf870848ed39",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Grey",
                              name: "Grey",
                              displayName: "Grey",
                              fields: {
                                Value: {
                                  value: "grey"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        }
                      ]
                    }
                  },
                  {
                    id: "3a715817-b482-4e91-8ac1-e45e7644b91b",
                    displayName: "For Pros",
                    name: "For Pros",
                    templateId: "c162167b-e548-48b6-b09b-63cfbeb5d0f6",
                    templateName: "Nav Group",
                    url: "/Data/Components/Navigation/AW-Header/Main-Menu/For-Pros",
                    fields: {
                      navGroupTitle: {
                        value: "For Pros"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: [
                        {
                          id: "13be5a28-f2e9-4b9f-a97e-6c8603b8f46b",
                          displayName: "Link 1",
                          name: "Link 1",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/For-Pros/Link-1",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Item Link",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        },
                        {
                          id: "938c3db6-b1a4-45c8-a077-e763a701b9bb",
                          displayName: "Link 2",
                          name: "Link 2",
                          templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                          templateName: "Nav Item",
                          url: "/Data/Components/Navigation/AW-Header/Main-Menu/For-Pros/Link-2",
                          fields: {
                            navItemIcon: null,
                            navItemImage: {
                              value: {}
                            },
                            navItemLink: {
                              value: {
                                href: "/",
                                text: "Item Link",
                                anchor: "",
                                linktype: "internal",
                                class: "",
                                title: "",
                                target: "",
                                querystring: "",
                                id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                              }
                            },
                            navItemStyle: {
                              id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                              name: "Bold Black",
                              displayName: "Bold Black",
                              fields: {
                                Value: {
                                  value: "bold-black"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            displayType: {
                              id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                              url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                              name: "Desktop And Mobile",
                              displayName: "Desktop And Mobile",
                              fields: {
                                Value: {
                                  value: "desktop-and-mobile"
                                }
                              },
                              templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                              templateName: "Enum"
                            },
                            mobileSortOrder: {
                              value: null
                            },
                            children: []
                          }
                        }
                      ]
                    }
                  },
                  {
                    id: "b2386c0b-aeaf-4655-bc10-753fb798f1d2",
                    displayName: "Request a quote",
                    name: "Request a quote",
                    templateId: "40210326-6119-4420-8a5d-4deccbf8d547",
                    templateName: "Nav Menu CTA",
                    url: "/Data/Components/Navigation/AW-Header/Main-Menu/Request-a-quote",
                    fields: {
                      cta1Icon: null,
                      cta1Link: {
                        value: {
                          href: ""
                        }
                      },
                      cta1Modal: {
                        id: "e8517485-37d8-4c85-bb2a-a269b4b318e5",
                        url: "/Data/Components/Generic-Modals/Generic-Modal-Extra-Large",
                        name: "Generic Modal Extra Large",
                        displayName: "Generic Modal Extra Large",
                        fields: {
                          modalSize: {
                            id: "fe6d9820-0dcd-4cfe-8f89-c2333d243470",
                            url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Generic-Modal-Size/Extra-Large",
                            name: "Extra Large",
                            displayName: "Extra Large",
                            fields: {
                              Value: {
                                value: "extra-large"
                              }
                            },
                            templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                            templateName: "Enum"
                          },
                          componentSpacing: null,
                          sectionId: {
                            value: ""
                          },
                          modalId: {
                            value: "genericModal1"
                          },
                          eventName: {
                            value: ""
                          },
                          eventType: {
                            value: ""
                          },
                          eventZone: {
                            value: ""
                          }
                        },
                        templateId: "1a9db7e8-eb55-41d1-88e2-a5d1f548b045",
                        templateName: "Generic Modal"
                      },
                      cta1ModalLinkText: {
                        value: "Request a quote"
                      },
                      cta1Style: {
                        id: "49a23327-0397-4cce-a930-e76918d37c42",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Primary",
                        name: "Primary",
                        displayName: "Primary",
                        fields: {
                          Value: {
                            value: "primary"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: []
                    }
                  }
                ]
              }
            },
            {
              id: "9c0743cb-1bcf-445d-9d9f-146658affd56",
              displayName: "Utility Menu",
              name: "Utility Menu",
              templateId: "905c7f52-d418-43cb-834c-bc033560bc4d",
              templateName: "Nav Menu",
              url: "/Data/Components/Navigation/AW-Header/Utility-Menu",
              fields: {
                menuTitle: {
                  value: "utilityMenu"
                },
                children: [
                  {
                    id: "02f98c05-591b-4203-bc87-76a20f83857f",
                    displayName: "My Favorites",
                    name: "My Favorites",
                    templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                    templateName: "Nav Item",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/My-Favorites",
                    fields: {
                      navItemIcon: {
                        id: "53e0d3a5-321e-4f8f-9e8d-85251612fcfb",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Favorite",
                        name: "Favorite",
                        displayName: "Favorite",
                        fields: {
                          Value: {
                            value: "favorite"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      navItemImage: {
                        value: {}
                      },
                      navItemLink: {
                        value: {
                          href: "/",
                          text: "My Favorites",
                          anchor: "",
                          linktype: "internal",
                          class: "MyFavorites",
                          title: "",
                          target: "",
                          querystring: "",
                          id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                        }
                      },
                      navItemStyle: {
                        id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                        name: "Bold Black",
                        displayName: "Bold Black",
                        fields: {
                          Value: {
                            value: "bold-black"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: 5
                      },
                      children: []
                    }
                  },
                  {
                    id: "1e9ac7e8-e03f-4659-a1aa-aad9bab5ae58",
                    displayName: "Where to Buy",
                    name: "Where to Buy",
                    templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                    templateName: "Nav Item",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/Where-to-Buy",
                    fields: {
                      navItemIcon: null,
                      navItemImage: {
                        value: {}
                      },
                      navItemLink: {
                        value: {
                          href: "/",
                          text: "Item Link",
                          anchor: "",
                          linktype: "internal",
                          class: "",
                          title: "",
                          target: "",
                          querystring: "",
                          id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                        }
                      },
                      navItemStyle: {
                        id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                        name: "Bold Black",
                        displayName: "Bold Black",
                        fields: {
                          Value: {
                            value: "bold-black"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: 2
                      },
                      children: []
                    }
                  },
                  {
                    id: "1cd3fe9c-1eda-4473-9939-92ffe5a45246",
                    displayName: "Find a Contractor",
                    name: "Find a Contractor",
                    templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                    templateName: "Nav Item",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/Find-a-Contractor",
                    fields: {
                      navItemIcon: null,
                      navItemImage: {
                        value: {}
                      },
                      navItemLink: {
                        value: {
                          href: "/",
                          text: "Item Link",
                          anchor: "",
                          linktype: "internal",
                          class: "",
                          title: "",
                          target: "",
                          querystring: "",
                          id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                        }
                      },
                      navItemStyle: {
                        id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                        name: "Bold Black",
                        displayName: "Bold Black",
                        fields: {
                          Value: {
                            value: "bold-black"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: 3
                      },
                      children: []
                    }
                  },
                  {
                    id: "2348fc31-dd1a-4f5e-8ac7-684a7761eee8",
                    displayName: "Visit RbA",
                    name: "Visit RbA",
                    templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                    templateName: "Nav Item",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/Visit-RbA",
                    fields: {
                      navItemIcon: null,
                      navItemImage: {
                        value: {}
                      },
                      navItemLink: {
                        value: {
                          href: "/",
                          text: "Item Link",
                          anchor: "",
                          linktype: "internal",
                          class: "",
                          title: "",
                          target: "",
                          querystring: "",
                          id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                        }
                      },
                      navItemStyle: {
                        id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                        name: "Bold Black",
                        displayName: "Bold Black",
                        fields: {
                          Value: {
                            value: "bold-black"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: 4
                      },
                      children: []
                    }
                  },
                  {
                    id: "ca589000-5f01-4f4c-b80c-1db2be7e7367",
                    displayName: "Separator",
                    name: "Separator",
                    templateId: "5debf87f-461f-4e52-8772-09aff1219c30",
                    templateName: "Separator",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/Separator",
                    fields: {
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
                      },
                      children: []
                    }
                  },
                  {
                    id: "a54679f1-6589-44c2-aee9-e08af76c3607",
                    displayName: "Phone Number",
                    name: "Phone Number",
                    templateId: "40210326-6119-4420-8a5d-4deccbf8d547",
                    templateName: "Nav Menu CTA",
                    url: "/Data/Components/Navigation/AW-Header/Utility-Menu/Phone-Number",
                    fields: {
                      cta1Icon: null,
                      cta1Link: {
                        value: {
                          href: "http://tel:1-800-426-4261",
                          text: "1-800-426-4261",
                          linktype: "external",
                          url: "tel:1-800-426-4261",
                          anchor: "",
                          target: ""
                        }
                      },
                      cta1Modal: null,
                      cta1ModalLinkText: {
                        value: ""
                      },
                      cta1Style: null,
                      displayType: {
                        id: "f711c660-ecf3-4e50-91e0-34e899d9b8b7",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Desktop-And-Mobile",
                        name: "Desktop And Mobile",
                        displayName: "Desktop And Mobile",
                        fields: {
                          Value: {
                            value: "desktop-and-mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: 1
                      },
                      children: []
                    }
                  }
                ]
              }
            },
            {
              id: "b1b0f1b7-227a-4811-8830-2944a19b3441",
              displayName: "Search Bar",
              name: "Search Bar",
              templateId: "905c7f52-d418-43cb-834c-bc033560bc4d",
              templateName: "Nav Menu",
              url: "/Data/Components/Navigation/AW-Header/Search-Bar",
              fields: {
                menuTitle: {
                  value: "Nav Menu"
                },
                children: [
                  {
                    id: "211c93ae-ed13-40fe-bd6f-b31ac64f5921",
                    displayName: "Where to buy",
                    name: "Where to buy",
                    templateId: "06067cc8-00e9-454a-809e-c1d804d1e40f",
                    templateName: "Nav Item",
                    url: "/Data/Components/Navigation/AW-Header/Search-Bar/Where-to-buy",
                    fields: {
                      navItemIcon: {
                        id: "4949a2a5-927a-4a11-a533-1ab9753661b1",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Icons/Location-Pin",
                        name: "Location Pin",
                        displayName: "Location Pin",
                        fields: {
                          Value: {
                            value: "location-pin"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      navItemImage: {
                        value: {}
                      },
                      navItemLink: {
                        value: {
                          href: "/",
                          text: "Item Link",
                          anchor: "",
                          linktype: "internal",
                          class: "",
                          title: "",
                          target: "",
                          querystring: "",
                          id: "{7FB335D2-8E99-458E-9EF9-562A78CCB821}"
                        }
                      },
                      navItemStyle: {
                        id: "1ed23026-a2fd-49b0-99e3-64cab99f22d3",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Nav-Link-Style/Bold-Black",
                        name: "Bold Black",
                        displayName: "Bold Black",
                        fields: {
                          Value: {
                            value: "bold-black"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      displayType: {
                        id: "9444bab2-4179-44f9-b4b6-87fabbc75bba",
                        url: "http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Navigation-Display-Type/Mobile",
                        name: "Mobile",
                        displayName: "Mobile",
                        fields: {
                          Value: {
                            value: "mobile"
                          }
                        },
                        templateId: "d2923fee-da4e-49be-830c-e27764dfa269",
                        templateName: "Enum"
                      },
                      mobileSortOrder: {
                        value: null
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
