"use client";

import Loading from "@/app/loading";
import FormTextArea from "@/components/forms/FormTextArea.tsx";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import ImageUpload from "@/components/ui/image-upload";
import { useBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Col, Row, message } from "antd";
import { useState } from "react";

const EditBlogsPage = ({ params }: any) => {
  const id = params.id;

  const { role } = getUserInfo() as any;

  const { data, isLoading, refetch } = useBlogQuery(id);
  const blogs = data?.data;

  const [imageUrl, setImageUrl] = useState(blogs?.imageLink);

  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding Service...");
    try {
      const serviceData = { imageLink: imageUrl, ...data };
      const res = await updateBlog({ body: serviceData, id }).unwrap();
      console.log(res);
      if (res?.success) {
        setImageUrl(imageUrl);
        message.success("Service Updeting successfully");
        refetch();
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    title: blogs?.title,
    content: blogs?.content,
  };
  if (isLoading) <Loading />;

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Blogs",
            path: `/${role}/blogs`,
          },
          {
            label: "Update Blog",
          },
        ]}
      />

      <h1>Update Blog</h1>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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

export default EditBlogsPage;
