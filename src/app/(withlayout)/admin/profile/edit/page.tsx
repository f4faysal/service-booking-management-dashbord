"use client";

import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import ActionBar from "@/components/ui/actionBar";
import ImageUpload from "@/components/ui/image-upload";
import { useProfileQuery, useUpdateProfileMutation } from "@/redux/api/user";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EditProfile = () => {
  const { role } = getUserInfo() as any;

  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();

  const { data, isLoading } = useProfileQuery({});
  const user = data?.data;
  const [imageUrl, setImageUrl] = useState(user?.profileImg);
  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating User...");
    try {
      const res = await updateProfile({
        profileImg: imageUrl,
        ...values,
      }).unwrap();
      if (res?.success) {
        message.success("Profile updated successfully");
        setImageUrl(user?.profileImg);
        router.push(`/${role}/profile`);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const dafaultValues = {
    name: user?.name || "",
    contactNumber: user?.contactNumber || "",
    address: user?.address || "",
  };

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Edit Profile",
          },
        ]}
      />
      <ActionBar title="Udate Profile Information">
        <Form submitHandler={onSubmit} defaultValues={dafaultValues}>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput
                name="name"
                label="Update yoer name"
                size="large"
                placeholder="Enter yoer name"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput
                name="contactNumber"
                label="Update Number"
                size="large"
                placeholder="phone number"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormInput
                name="address"
                label="Update Address"
                size="large"
                placeholder="address"
              />
            </Col>
          </Row>
          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            <Col
              span={8}
              style={{
                margin: "10px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <Avatar shape="square" size={200} src={imageUrl} />
              <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            update
          </Button>
        </Form>
      </ActionBar>
    </div>
  );
};

export default EditProfile;
