const defaultData = {
  rendering: {
    dataSource: 'sampledatasource',
    componentName: 'Search',
  },
  fields: {
    showResultsLabel: {
      value: 'Show Results',
    },
    clearAllLabel: {
      value: 'Clear All',
    },
    facetSectionHeading: {
      value: 'Refine By',
    },
    filtersLabel: {
      value: 'Filters',
    },
    noResultsBody: {
      value:
        '<p>Search Tips:</p>\n<ul>\n    <li>Check the spelling of your keywords.\n    </li>\n    <li>Try adjusting your search</li>\n</ul>',
    },
    noResultsHeadline: {
      value: 'Sorry! No results found',
    },
    numberOfResultsPerPage: {
      value: 10,
    },
    noResultsBody: {
      value:
        '<p>Search Tips:</p>\n<ul>\n    <li>Check the spelling of your keywords.\n    </li>\n    <li>Try adjusting your search</li>\n</ul>',
    },
    pager: {
      id: 'e14be32e-4b02-4e7d-b8d7-86eea18a1987',
      url: '/Data/Elements/Search/Pager/Pager',
      name: 'Pager',
      displayName: 'Pager',
      fields: {
        numberOfPagesMobile: {
          value: 3,
        },
        numberOfPages: {
          value: 5,
        },
      },
      templateId: '37fa519e-15f3-40e2-8212-56cf5007f97d',
      templateName: 'Pager',
    },
    querySummary: {
      id: '07b7f4c3-da0c-41a4-abe8-54e0e082f6a5',
      url: '/Data/Elements/Search/Query-Summary/Query-Summary',
      name: 'Query Summary',
      displayName: 'Query Summary',
      fields: {
        summaryText: {
          value:
            '<p>Results <strong>${firstResult}-${lastResult}</strong> of <strong>${total}</strong></p>',
        },
      },
      templateId: 'bea24c05-c310-482c-b285-13e7f207bec2',
      templateName: 'Query Summary',
    },
    searchBox: {
      id: 'b122f387-770e-40a7-ad5d-d7a773c201ff',
      url: '/Data/Elements/Search/Search-Box/Search-Box',
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
    didYouMean: {
      id: '8cd1f503-236d-4990-8a76-dc4270a34105',
      url: '/Data/Elements/Search/Did-You-Mean/Did-You-Mean',
      name: 'Did You Mean',
      displayName: 'Did You Mean',
      fields: {
        autoCorrectionText: {
          value: '<p>Query was automatically corrected to <strong>{correctedQuery}</strong></p>',
        },
        didYouMeanText: {
          value: '<p>Did you mean: <strong>{correctedQuery}</strong> </p>',
        },
        noResultsText: {
          value: '<p>No results for <strong>{query}</strong></p>',
        },
      },
      templateId: '5c3df826-d08a-4685-b455-68b6b4dd8691',
      templateName: 'Did You Mean',
    },
    facets: [
      {
        id: 'cccd1b35-2863-4870-97ce-296df70902d6',
        url: '/Data/Elements/Search/Facets/Topics',
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
            value: 3,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '97362363-75c4-4725-9e88-239ef67222f9',
        url: '/Data/Elements/Search/Facets/Window-Type',
        name: 'Window Type',
        displayName: 'Window Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'a515e90b-97fb-4301-a103-33c83aa0533c',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Window-Type',
            name: 'Window Type',
            displayName: 'Window Type',
            fields: {
              Value: {
                value: 'ew_document_windowtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Window Style',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '572a6024-154b-4bed-97ba-01ecd0879dbf',
        url: '/Data/Elements/Search/Facets/Awning-Type',
        name: 'Awning Type',
        displayName: 'Awning Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: '334a1777-8a66-4484-a7a6-91a54847a543',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Awning-Type',
            name: 'Awning Type',
            displayName: 'Awning Type',
            fields: {
              Value: {
                value: 'ew_document_awningtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Awning Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '52bbb45f-fc4b-4ae5-8908-e73abdbe7edf',
        url: '/Data/Elements/Search/Facets/Casement-Type',
        name: 'Casement Type',
        displayName: 'Casement Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'debb5cc9-a941-4d5d-b383-5f89e6b59dbc',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Casement-Type',
            name: 'Casement Type',
            displayName: 'Casement Type',
            fields: {
              Value: {
                value: 'ew_document_casementtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Casement Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '664c55f3-4193-4f97-9b13-b5f01cbad3ff',
        url: '/Data/Elements/Search/Facets/Document-Language',
        name: 'Document Language',
        displayName: 'Document Language',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'fbcaf539-9614-4b36-a59c-fb1142686d1a',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Document-Language',
            name: 'Document Language',
            displayName: 'Document Language',
            fields: {
              Value: {
                value: 'ew_document_language',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Document Language',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: 'cade4450-5446-4ea8-96fa-da9c8021bb2b',
        url: '/Data/Elements/Search/Facets/Document-Type',
        name: 'Document Type',
        displayName: 'Document Type',
        fields: {
          dependsOn: null,
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
            value: 'Document Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '7493f74c-d51c-4262-871f-9ffd7be2e206',
        url: '/Data/Elements/Search/Facets/Door-Type',
        name: 'Door Type',
        displayName: 'Door Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'd367b3a8-1320-4bd4-b27d-99554387b1f6',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Door-Type',
            name: 'Door Type',
            displayName: 'Door Type',
            fields: {
              Value: {
                value: 'ew_document_doortype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Door Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '86cfc9a3-4176-48f6-8bf7-e7a371768225',
        url: '/Data/Elements/Search/Facets/Product-Options',
        name: 'Product Options',
        displayName: 'Product Options',
        fields: {
          dependsOn: null,
          facetField: {
            id: '5569d817-0a58-4a73-aee4-13e771d8b0ee',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Product-Options',
            name: 'Product Options',
            displayName: 'Product Options',
            fields: {
              Value: {
                value: 'ew_document_productoptions',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Product Options',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: 'a73a0474-a622-4e31-8a33-2ca8cd151253',
        url: '/Data/Elements/Search/Facets/Product-Series',
        name: 'Product Series',
        displayName: 'Product Series',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'ee3b9163-b71c-4bcb-b975-0af7defc3baa',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Product-Series',
            name: 'Product Series',
            displayName: 'Product Series',
            fields: {
              Value: {
                value: 'ew_document_productseries',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Product Series',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '97362363-75c4-4725-9e88-239ef67222f9',
        url: '/Data/Elements/Search/Facets/Window-Type',
        name: 'Window Type',
        displayName: 'Window Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'a515e90b-97fb-4301-a103-33c83aa0533c',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Window-Type',
            name: 'Window Type',
            displayName: 'Window Type',
            fields: {
              Value: {
                value: 'ew_document_windowtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Window Style',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '572a6024-154b-4bed-97ba-01ecd0879dbf',
        url: '/Data/Elements/Search/Facets/Awning-Type',
        name: 'Awning Type',
        displayName: 'Awning Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: '334a1777-8a66-4484-a7a6-91a54847a543',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Awning-Type',
            name: 'Awning Type',
            displayName: 'Awning Type',
            fields: {
              Value: {
                value: 'ew_document_awningtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Awning Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '52bbb45f-fc4b-4ae5-8908-e73abdbe7edf',
        url: '/Data/Elements/Search/Facets/Casement-Type',
        name: 'Casement Type',
        displayName: 'Casement Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'debb5cc9-a941-4d5d-b383-5f89e6b59dbc',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Casement-Type',
            name: 'Casement Type',
            displayName: 'Casement Type',
            fields: {
              Value: {
                value: 'ew_document_casementtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Casement Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '664c55f3-4193-4f97-9b13-b5f01cbad3ff',
        url: '/Data/Elements/Search/Facets/Document-Language',
        name: 'Document Language',
        displayName: 'Document Language',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'fbcaf539-9614-4b36-a59c-fb1142686d1a',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Document-Language',
            name: 'Document Language',
            displayName: 'Document Language',
            fields: {
              Value: {
                value: 'ew_document_language',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Document Language',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: 'cade4450-5446-4ea8-96fa-da9c8021bb2b',
        url: '/Data/Elements/Search/Facets/Document-Type',
        name: 'Document Type',
        displayName: 'Document Type',
        fields: {
          dependsOn: null,
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
            value: 'Document Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '7493f74c-d51c-4262-871f-9ffd7be2e206',
        url: '/Data/Elements/Search/Facets/Door-Type',
        name: 'Door Type',
        displayName: 'Door Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'd367b3a8-1320-4bd4-b27d-99554387b1f6',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Door-Type',
            name: 'Door Type',
            displayName: 'Door Type',
            fields: {
              Value: {
                value: 'ew_document_doortype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Door Type',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '86cfc9a3-4176-48f6-8bf7-e7a371768225',
        url: '/Data/Elements/Search/Facets/Product-Options',
        name: 'Product Options',
        displayName: 'Product Options',
        fields: {
          dependsOn: null,
          facetField: {
            id: '5569d817-0a58-4a73-aee4-13e771d8b0ee',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Product-Options',
            name: 'Product Options',
            displayName: 'Product Options',
            fields: {
              Value: {
                value: 'ew_document_productoptions',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Product Options',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: 'a73a0474-a622-4e31-8a33-2ca8cd151253',
        url: '/Data/Elements/Search/Facets/Product-Series',
        name: 'Product Series',
        displayName: 'Product Series',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'ee3b9163-b71c-4bcb-b975-0af7defc3baa',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Product-Series',
            name: 'Product Series',
            displayName: 'Product Series',
            fields: {
              Value: {
                value: 'ew_document_productseries',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Product Series',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
      {
        id: '97362363-75c4-4725-9e88-239ef67222f9',
        url: '/Data/Elements/Search/Facets/Window-Type',
        name: 'Window Type',
        displayName: 'Window Type',
        fields: {
          dependsOn: null,
          facetField: {
            id: 'a515e90b-97fb-4301-a103-33c83aa0533c',
            url: 'http://localhost/sitecore/login/sitecore/system/Settings/Feature/EnterpriseWeb/Enums/Search/Facet-Fields/Window-Type',
            name: 'Window Type',
            displayName: 'Window Type',
            fields: {
              Value: {
                value: 'ew_document_windowtype',
              },
            },
            templateId: 'd2923fee-da4e-49be-830c-e27764dfa269',
            templateName: 'Enum',
          },
          facetLabel: {
            value: 'Window Style',
          },
          numberOfValues: {
            value: null,
          },
          searchLabel: {
            value: 'Search',
          },
          showLessLabel: {
            value: 'Show Less',
          },
          showMoreLabel: {
            value: 'Show More',
          },
          sortCriteria: null,
        },
        templateId: '91b5c789-f80a-43ef-b337-b21db163b0f1',
        templateName: 'Facet',
      },
    ],
    pager: {
      id: 'fd6deafd-88bf-4a92-ac2f-99847a5721cd',
      url: '/Data/Elements/Search/Pager/Pager',
      name: 'Pager',
      displayName: 'Pager',
      fields: {
        numberOfPagesMobile: {
          value: 3,
        },
        numberOfPages: {
          value: 5,
        },
      },
      templateId: '37fa519e-15f3-40e2-8212-56cf5007f97d',
      templateName: 'Pager',
    },
    querySummary: {
      id: '760be856-3c9f-400a-86d3-ba1071b4f414',
      url: '/Data/Elements/Search/Query-Summary/Query-Summary',
      name: 'Query Summary',
      displayName: 'Query Summary',
      fields: {
        summaryText: {
          value:
            '<p>Results <strong>${firstResult}-${lastResult}</strong> of <strong>${total}</strong></p>',
        },
      },
      templateId: 'bea24c05-c310-482c-b285-13e7f207bec2',
      templateName: 'Query Summary',
    },
    searchBox: {
      id: 'd4f32d86-db9f-49a1-95cf-fee2af4ccb57',
      url: '/Data/Elements/Search/Search-Box/Search-Box',
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
        id: '{389C03C7-02A0-463C-B02B-4ED091CAAD15}',
      },
    },
    cta1Modal: null,
    cta1ModalLinkText: {
      value: '',
    },
    queryPipeline: {
      value: 'sitesearch',
    },
    searchHub: {
      value: 'search',
    },
    eventZone: {
      value: '',
    },
    queryPipeline: {
      value: 'sitesearch',
    },
    searchHub: {
      value: 'search',
    },
    eventName: {
      value: '',
    },
    eventType: {
      value: '',
    },
  },
};

export default defaultData;
