"use client";
import { Layout, Menu } from "antd";
import { useState } from "react";

import { USER_ROLE } from "@/constants/role";
import { sidebarItems } from "@/constants/sidebaritems";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const { role } = getUserInfo() as any;
  const role = USER_ROLE.ADMIN;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        Dashbord
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default SideBar;
