import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout, Row, Space } from "antd";
import { useRouter } from "next/navigation";

import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader
      style={{
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        zIndex: 1,
        width: "100%",
        padding: "0 20px",
      }}
    >
      <Row
        justify={"end"}
        align={"middle"}
        style={{
          height: "100%",
        }}
      >
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Space wrap size={16}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
