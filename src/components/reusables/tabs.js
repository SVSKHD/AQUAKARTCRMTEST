import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const AquaCrmTabs = ({ tabs, active, onTabChange }) => {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="justify-tab-example"
      className="mb-3"
      activeKey={active}
      onSelect={onTabChange}
      justify
    >
      {tabs.map((tab, i) => (
        <Tab
          style={{ height: tab.height, overflowY: "auto" }}
          eventKey={tab.title}
          title={tab.title}
          key={i}
        >
          {tab.component}
        </Tab>
      ))}
    </Tabs>
  );
};

export default AquaCrmTabs;
