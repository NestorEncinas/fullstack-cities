import React from "react";
import { Menu, Icon } from "antd";

const NavigationTopBar = () => {
  //   const { SubMenu } = Menu;
  return (
    <Menu.Item key="mail">
      <Icon type="mail" />
      Navigation One
    </Menu.Item>
  );
};

export default NavigationTopBar;
