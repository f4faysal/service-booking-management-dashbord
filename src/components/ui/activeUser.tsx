"use client";
import { useUsersListQuery } from "@/redux/api/user";
import { Progress, Space } from "antd";

const ActiveUser = () => {
  const { data } = useUsersListQuery({});

  const users = data?.userlist;
  return (
    <div
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: "20px",
        borderRadius: "10px",
        gap: "20px",
      }}
    >
      <h1> Active User {users?.length}</h1>
      <Space wrap>
        <Progress
          type="dashboard"
          percent={users?.length}
          status="active"
          format={(percent) => `${percent} Total`}
        />
      </Space>
    </div>
  );
};

export default ActiveUser;
