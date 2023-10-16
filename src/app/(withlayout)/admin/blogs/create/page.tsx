"use client";

import FormTextArea from "@/components/forms/FormTextArea.tsx";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import ImageUpload from "@/components/ui/image-upload";
import { useCreateBlogMutation } from "@/redux/api/blogApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Col, Row, message } from "antd";
import { useState } from "react";

const CreateServicePage = () => {
  const { role } = getUserInfo() as any;
  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dhvuyehnq/image/upload/v1697354272/gcu3mnulmato2odnqqvp.png"
  );

  // const [createServices] = useCreateServicesMutation();
  const [createBlog] = useCreateBlogMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding Service...");
    try {
      const blogData = { imageLink: imageUrl, ...data };
      const res = await createBlog(blogData).unwrap();
      console.log(res);
      if (res?.success) {
        setImageUrl(
          "https://res.cloudinary.com/dhvuyehnq/image/upload/v1697354272/gcu3mnulmato2odnqqvp.png"
        );
        message.success("Service added successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Blogs",
            path: `/${role}/blogs`,
          },
          {
            label: "Create Blog",
          },
        ]}
      />

      <h1>Create Blog</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="title"
              label="Blog Title"
              type="text"
              placeholder="Blog Title"
              size="large"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea
              name="content"
              label="Blog Content"
              placeholder="Blog Content"
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
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateServicePage;
