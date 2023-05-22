import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';

export type TabsProps = Feature.EnterpriseWeb.Elements.Tabs.TabCollection;

const Tabs = (props: any): JSX.Element => {
  const { currentTabIndex, classes } = props;

  return (
    <div className={classes.tabWrapper}>
      {/* TabTitles Component */}
      <div className={classes.tabTitlesList}>{props.children[0]}</div>
      {/* TabPanel Component */}
      <div className={classes.tabPanel}>{props.children[1][currentTabIndex]}</div>
    </div>
  );
};

export default Tabs;
