const defaultData = [{
    rendering: {
      dataSource: 'sampledatasource',
      componentName: 'ContentBlock',
    },
    fields: {
      sectionId: {
        value: 'testid',
      },
      heading: {
        value: 'Content Block Heading Goes Here',
      },
      headingLevel: {
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
    },
    dataComponent: 'general/test',
  }, {
    rendering: {
      dataSource: 'sampledatasource',
      componentName: 'Test',
    },
    fields: {
      heading: {
        value: 'Content Block Heading Goes Here',
      },
      headingLevel: {
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
    },
  }
];

export default defaultData;
