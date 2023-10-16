"use client";

import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { useProfileQuery } from "@/redux/api/user";
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

const ProfilePage = () => {
  const { data, isLoading } = useProfileQuery({});

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Profile",
          },
        ]}
      />
      <Row>
        <Col span={8}>
          <div
            style={{
              width: "90%",
            }}
          >
            <Badge.Ribbon color="magenta" text={data?.data?.role}>
              <Card title="Profile" loading={isLoading}>
                <Avatar
                  size={150}
                  icon={<UserOutlined />}
                  style={{
                    marginBottom: "1rem",
                  }}
                  src={data?.data?.profileImg}
                />

                <h1
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {data?.data?.name}
                </h1>
                <Meta title={data?.data?.email} />
              </Card>
            </Badge.Ribbon>
            <Card
              title="Information"
              loading={isLoading}
              style={{
                marginTop: "1rem",
              }}
            >
              <Meta
                style={{
                  marginBottom: "1rem",

                  alignItems: "center",
                }}
                title={data?.data?.email}
                avatar={<Avatar icon={<MailOutlined />} />}
              />
              <Meta
                style={{
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
                title={data?.data?.contactNumber}
                avatar={<Avatar icon={<PhoneOutlined />} />}
              />
              <Meta
                style={{
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
                title={data?.data?.address}
                avatar={<Avatar icon={<HomeOutlined />} />}
              />
            </Card>
          </div>
        </Col>

        <Col span={16}></Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
