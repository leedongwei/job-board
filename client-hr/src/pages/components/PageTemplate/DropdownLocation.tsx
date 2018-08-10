import * as React from 'react';

import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import { MdLocationOn } from 'react-icons/md';

const DropdownLocation: React.SFC = (props) => {
  const menuLocation = (
    <Menu>
      <Menu.Item disabled={true}>
        <a rel={'SF Bay Area'} href={'/#'}>SF Bay Area</a>
      </Menu.Item>
      <Menu.Item disabled={true}>
        <span>More areas to come!</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menuLocation}>
      <Button><MdLocationOn style={{ fontSize: 16, verticalAlign: 'text-bottom' }}/> SF Bay Area</Button>
    </Dropdown>
  );
}

export default DropdownLocation;
