import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { Tab } from '../../const';

import './nav-tabs.css';

const items: TabsProps['items'] = [
  {
    key: Tab.Search,
    label: Tab.Search,
  },
  {
    key: Tab.Rated,
    label: Tab.Rated,
  },
];

interface NavTabs {
  onChnage: (newTab: string) => void;
}

function NavTabs({ onChnage }: NavTabs) {
  return <Tabs defaultActiveKey={Tab.Search} items={items} onChange={onChnage} centered />;
}

export default NavTabs;
