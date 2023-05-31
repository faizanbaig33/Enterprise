const defaultData = {
  rendering: {
    dataSource: 'sampledatasource',
    componentName: 'Search',
  },
  fields: {
    gridResultItems: [],
    gridStyle: null,
    listResultItems: [
      {
        id: '51b76672-ee98-4435-b286-f3e7eb587b66',
        url: '/Data/Elements/Search/Result-Items/Global-Site-Search/Generic',
        name: 'Generic',
        displayName: 'Generic',
        fields: {
          descriptionField: {
            id: '0cbb3c18-b35b-43d5-a199-3b2636bc8cec',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Site-Search-Description',
            name: 'Site Search Description',
            displayName: 'Site Search Description',
            fields: {
              Value: {
                value: 'ew_sitesearchdescription',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          eyebrowField: {
            id: 'bd539482-0573-41ba-93d4-c7bf4b8f61ff',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Site-Search-Eyebrow',
            name: 'Site Search Eyebrow',
            displayName: 'Site Search Eyebrow',
            fields: {
              Value: {
                value: 'ew_eyebrow',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          headingField: {
            id: '8ebd6f25-bc4a-44f8-a119-e653f3a54b03',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Site-Search-Headline',
            name: 'Site Search Headline',
            displayName: 'Site Search Headline',
            fields: {
              Value: {
                value: 'ew_sitesearchheadline',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          icon: {
            value: {},
          },
          imageField: {
            id: '7ef6aca2-f90c-4cfc-8157-d2faeec38cdb',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Site-Search-Image',
            name: 'Site Search Image',
            displayName: 'Site Search Image',
            fields: {
              Value: {
                value: 'ew_sitesearchimage',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          resultType: [
            {
              id: '9b1ee83d-9280-4bfe-9c81-3df8927128a8',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Page-Types/Generic',
              name: 'Generic',
              displayName: 'Generic',
              fields: {
                Value: {
                  value: '6AF8B67C11374B57A0E49EEEB1DFCCFA|79C7F0AF3F6549CA821180F33EFF62EE',
                },
              },
              templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
              templateName: 'Enum',
            },
          ],
        },
        templateId: 'f520a88a-c710-4363-aa8c-0ff65ff906db',
        templateName: 'List Result Item',
      },
      {
        id: '76fcaab5-4b83-4ea0-a8d7-7406a3653e2e',
        url: '/Data/Elements/Search/Result-Items/Global-Site-Search/Technical-Document',
        name: 'Technical Document',
        displayName: 'Technical Document',
        fields: {
          descriptionField: {
            id: 'eed74f81-121e-41bb-ac60-09d82c157392',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Document-Description',
            name: 'Document Description',
            displayName: 'Document Description',
            fields: {
              Value: {
                value: 'ew_documentdescritpion',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          eyebrowField: {
            id: 'd31af6c8-43d6-4d34-a29d-ab473a4688ff',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Document-Eyebrow',
            name: 'Document Eyebrow',
            displayName: 'Document Eyebrow',
            fields: {
              Value: {
                value: 'ew_documenteyebrow',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          headingField: {
            id: '4229f1f1-459a-464e-a2fe-bb2a3543f41a',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Fields/Document-Title',
            name: 'Document Title',
            displayName: 'Document Title',
            fields: {
              Value: {
                value: 'ew_documenttitle',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          icon: {
            value: {
              src: 'https://edge.sitecorecloud.io/andersencorporation-m9n8s20s/media/Project/AndersenCorporation/AndersenWindows/shared/pdflogo.png?h=50&iar=0&w=50',
              alt: 'PDF Logo',
              width: '50',
              height: '50',
            },
          },
          imageField: null,
          resultType: [
            {
              id: '64d42b18-fbcf-4963-91d7-a2770f610eb6',
              url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Page-Types/Technical-Document',
              name: 'Technical Document',
              displayName: 'Technical Document',
              fields: {
                Value: {
                  value: '185E5295D62B4B4793B272E59A3F5360',
                },
              },
              templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
              templateName: 'Enum',
            },
          ],
        },
        templateId: 'f520a88a-c710-4363-aa8c-0ff65ff906db',
        templateName: 'List Result Item',
      },
    ],
    didYouMean: {
      id: '6d8ab3c8-6825-40fa-8d7f-26e11a20ab56',
      url: '/Data/Elements/Search/Did-You-Mean/Did-You-Mean',
      name: 'Did You Mean',
      displayName: 'Did You Mean',
      fields: {
        autoCorrectionText: {
          value: 'Query was automatically corrected to',
        },
        didYouMeanText: {
          value: 'Did you mean:',
        },
        noResultsText: {
          value: 'No results for',
        },
      },
      templateId: '5c3df826-d08a-4685-b455-68b6b4dd8691',
      templateName: 'Did You Mean',
    },
    facets: [
      {
        id: '0a16defc-9cbc-425f-b3a8-382e48b8497a',
        url: '/Data/Elements/Search/Facets/Global-Site-Search/Topics',
        name: 'Topics',
        displayName: 'Topics',
        fields: {
          dependsOn: null,
          facetField: {
            id: '6107800b-881b-438a-9ed8-9a91a9b28d77',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Site-Search-Topic',
            name: 'Site Search Topic',
            displayName: 'Site Search Topic',
            fields: {
              Value: {
                value: 'ew_sitesearchtopic',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Topics',
          },
          numberOfValues: {
            value: null,
          },
          sortCriteria: {
            id: 'f987da57-dc88-4aab-b311-c0802a4d58d2',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Values-Sort-Criteria/Alphanumeric',
            name: 'Alphanumeric',
            displayName: 'Alphanumeric',
            fields: {
              Value: {
                value: 'alphanumeric',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          uniqueIdentifier: {
            value: 'topics',
          },
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '9b5bac01-360f-4f4a-a9aa-8c06eed59724',
        url: '/Data/Elements/Search/Facets/Global-Site-Search/Product-Type',
        name: 'Product Type',
        displayName: 'Product Type',
        fields: {
          dependsOn: {
            id: '0a16defc-9cbc-425f-b3a8-382e48b8497a',
            url: '/Data/Elements/Search/Facets/Global-Site-Search/Topics',
            name: 'Topics',
            displayName: 'Topics',
            fields: {
              dependsOn: null,
              facetField: {
                id: '6107800b-881b-438a-9ed8-9a91a9b28d77',
                url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Site-Search-Topic',
                name: 'Site Search Topic',
                displayName: 'Site Search Topic',
                fields: {
                  Value: {
                    value: 'ew_sitesearchtopic',
                  },
                },
                templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                templateName: 'Enum',
              },
              facetLabel: {
                value: 'Topics',
              },
              numberOfValues: {
                value: null,
              },
              sortCriteria: {
                id: 'f987da57-dc88-4aab-b311-c0802a4d58d2',
                url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Values-Sort-Criteria/Alphanumeric',
                name: 'Alphanumeric',
                displayName: 'Alphanumeric',
                fields: {
                  Value: {
                    value: 'alphanumeric',
                  },
                },
                templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                templateName: 'Enum',
              },
              uniqueIdentifier: {
                value: 'topics',
              },
            },
            templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
            templateName: 'Facet',
          },
          facetField: {
            id: 'fc7b001a-6234-4b4c-bd14-9fdce82b01d3',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Product-Type',
            name: 'Product Type',
            displayName: 'Product Type',
            fields: {
              Value: {
                value: 'ew_producttype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Product Type',
          },
          numberOfValues: {
            value: null,
          },
          sortCriteria: {
            id: '91dac1a7-f7b3-459e-9075-49a9613a535e',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Values-Sort-Criteria/Automatic',
            name: 'Automatic',
            displayName: 'Automatic',
            fields: {
              Value: {
                value: 'automatic',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          uniqueIdentifier: {
            value: 'product-type',
          },
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: 'b3caa67b-f12f-410d-8aef-2be000140488',
        url: '/Data/Elements/Search/Facets/Global-Site-Search/Technical-Document-Type',
        name: 'Technical Document Type',
        displayName: 'Technical Document Type',
        fields: {
          dependsOn: {
            id: '0a16defc-9cbc-425f-b3a8-382e48b8497a',
            url: '/Data/Elements/Search/Facets/Global-Site-Search/Topics',
            name: 'Topics',
            displayName: 'Topics',
            fields: {
              dependsOn: null,
              facetField: {
                id: '6107800b-881b-438a-9ed8-9a91a9b28d77',
                url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Site-Search-Topic',
                name: 'Site Search Topic',
                displayName: 'Site Search Topic',
                fields: {
                  Value: {
                    value: 'ew_sitesearchtopic',
                  },
                },
                templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                templateName: 'Enum',
              },
              facetLabel: {
                value: 'Topics',
              },
              numberOfValues: {
                value: null,
              },
              sortCriteria: {
                id: 'f987da57-dc88-4aab-b311-c0802a4d58d2',
                url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Values-Sort-Criteria/Alphanumeric',
                name: 'Alphanumeric',
                displayName: 'Alphanumeric',
                fields: {
                  Value: {
                    value: 'alphanumeric',
                  },
                },
                templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
                templateName: 'Enum',
              },
              uniqueIdentifier: {
                value: 'topics',
              },
            },
            templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
            templateName: 'Facet',
          },
          facetField: {
            id: '0d85937c-5352-4018-a398-a498b171f4c1',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Document-Type',
            name: 'Document Type',
            displayName: 'Document Type',
            fields: {
              Value: {
                value: 'ew_documenttype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Technical Document Type',
          },
          numberOfValues: {
            value: null,
          },
          sortCriteria: {
            id: '91dac1a7-f7b3-459e-9075-49a9613a535e',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Values-Sort-Criteria/Automatic',
            name: 'Automatic',
            displayName: 'Automatic',
            fields: {
              Value: {
                value: 'automatic',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          uniqueIdentifier: {
            value: 'technical-document-type',
          },
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
    ],
    pager: {
      id: 'f473ea2f-999b-4d31-9838-d75d9c6b5c7d',
      url: '/Data/Elements/Search/Pager/Pager',
      name: 'Pager',
      displayName: 'Pager',
      fields: {
        numberOfPagesMobile: {
          value: null,
        },
        numberOfPages: {
          value: 10,
        },
      },
      templateId: '37fa519e-15f3-40e2-8212-56cf5007f97d',
      templateName: 'Pager',
    },
    searchBox: {
      id: '5a9907ae-5d10-494f-a4a4-64df1a2e10e0',
      url: '/Data/Elements/Search/Searchbox/Search-Box',
      name: 'Search Box',
      displayName: 'Search Box',
      fields: {
        placeholderText: {
          value: 'What can we help you find?',
        },
        numberOfSuggestions: {
          value: 5,
        },
        showSuggestions: {
          value: true,
        },
      },
      templateId: 'b83ebade-6b1c-44c9-904f-5857a393209f',
      templateName: 'Search Box',
    },
    resultLayout: {
      id: '14609a45-0da9-4c6c-848e-965e072de55a',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Result-Layout/List',
      name: 'List',
      displayName: 'List',
      fields: {
        Value: {
          value: 'list',
        },
      },
      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
      templateName: 'Enum',
    },
    searchParameters: {
      id: 'b29e6974-8833-4e30-8bb2-45a900abc471',
      url: '/Data/Elements/Search/Search-Parameters/Global-Site-Search',
      name: 'Global Site Search',
      displayName: 'Global Site Search',
      fields: {
        numberOfResultsPerPage: {
          value: 10,
        },
        noResultsHeadline: {
          value: 'Sorry! No results found',
        },
        noResultsBody: {
          value:
            '<p>Search Tips:</p>\r\n<ul>\r\n    <li>Check the spelling of your keywords.\r\n    </li>\r\n    <li>Try adjusting your search</li>\r\n</ul>',
        },
        filtersLabel: {
          value: 'Filters',
        },
        facetSectionHeading: {
          value: 'Refine By',
        },
        clearAllLabel: {
          value: 'Clear All',
        },
        showResultsLabel: {
          value: 'Show Results',
        },
        facetSearchLabel: {
          value: 'Search',
        },
        showLessLabel: {
          value: 'Show Less',
        },
        showMoreLabel: {
          value: 'Show More',
        },
        noFacetResultsBody: {
          value: 'No results found.',
        },
        queryPipeline: {
          value: 'default',
        },
        searchHub: {
          value: 'search',
        },
        filterExpression: {
          value: '@sc_templateid==6AF8B67C11374B57A0E49EEEB1DFCCFA',
        },
        boostingExpression: {
          value: '',
        },
        sortDirection: {
          id: 'c42d2a22-7100-4467-97e9-795e0e6de342',
          url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Sort-Direction/Ascending',
          name: 'Ascending',
          displayName: 'Ascending',
          fields: {
            Value: {
              value: 'ascending',
            },
          },
          templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
          templateName: 'Enum',
        },
        sortField: null,
        sortType: {
          id: '3616dca7-4a65-478a-84d3-0e6dd9c5c7a5',
          url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Sort-Type/Date',
          name: 'Date',
          displayName: 'Date',
          fields: {
            Value: {
              value: 'date',
            },
          },
          templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
          templateName: 'Enum',
        },
      },
      templateId: 'af4c725f-4863-4ec3-9976-d35a39e8aa62',
      templateName: 'Search Parameters',
    },
    columns: [],
    componentSpacing: null,
    sectionId: {
      value: '',
    },
    headlineLevel: {
      id: '0f556f3a-bbad-4aa5-952d-b79003b39cd6',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/Headline-Levels/Heading-2',
      name: 'Heading 2',
      displayName: 'Heading 2',
      fields: {
        Value: {
          value: 'h2',
        },
      },
      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
      templateName: 'Enum',
    },
    headlineText: {
      value: 'Search Results',
    },
    superscriptCTA: {
      value: {
        href: '',
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
      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
      templateName: 'Enum',
    },
    cta1Link: {
      value: {
        href: '/',
        text: 'View all resources',
        anchor: '',
        linktype: 'internal',
        class: '',
        title: '',
        target: '_blank',
        querystring: '',
        id: '{7FB335D2-8E99-458E-9EF9-562A78CCB821}',
      },
    },
    cta1Modal: null,
    cta1ModalLinkText: {
      value: '',
    },
    cta1Style: {
      id: 'dd818850-ec95-4d32-9774-7cc8173e277b',
      url: 'http://localhost/sitecore/login/sitecore/system/Settings/Foundation/EnterpriseWeb/Enums/CTA-Styles/Link',
      name: 'Link',
      displayName: 'Link',
      fields: {
        Value: {
          value: 'link',
        },
      },
      templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
      templateName: 'Enum',
    },
    eventName: {
      value: '',
    },
    eventType: {
      value: '',
    },
    eventZone: {
      value: '',
    },
  },
};

export default defaultData;
