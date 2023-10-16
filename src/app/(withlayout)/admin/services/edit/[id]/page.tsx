"use client";

import Loading from "@/app/loading";
import FormTextArea from "@/components/forms/FormTextArea.tsx";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import FormSelectField from "@/components/forms/formSelectField";
import ServiceCategoreField from "@/components/forms/service-catagory";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import ImageUpload from "@/components/ui/image-upload";
import { locationOption } from "@/constants/golobal";
import {
  useServicesQuery,
  useUpdateServicesMutation,
} from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Col, Row, message } from "antd";
import { useState } from "react";

const EditServicePage = ({ params }: any) => {
  const id = params.id;

  const { role } = getUserInfo() as any;

  const { data, isLoading, refetch } = useServicesQuery(id);
  const service = data?.data;

  const [imageUrl, setImageUrl] = useState(service?.imageLink);

  const [updateServices] = useUpdateServicesMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding Service...");
    try {
      const serviceData = { imageLink: imageUrl, ...data };
      const res = await updateServices({ body: serviceData, id }).unwrap();
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
    title: service?.title,
    price: service?.price,
    tax: service?.tax,
    location: service?.location,
    description: service?.location,
  };
  if (isLoading) <Loading />;

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Services",
            path: `/${role}/services`,
          },
          {
            label: "Create services",
          },
        ]}
      />

      <h1>Create Services</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="title"
              label="Service Title"
              type="text"
              placeholder="Service Title"
              size="large"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="price"
              label="Service Price"
              type="text"
              placeholder="Service Price"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="tax"
              label="Service Tax %"
              type="text"
              placeholder="Service Tax = price - (price * tax / 100)"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <ServiceCategoreField label="Service Category" name="categoryId" />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="location"
              label="Service Location"
              options={locationOption}
              placeholder="Select location"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea
              name="description"
              label="Service Description"
              placeholder="Service Description"
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

export default EditServicePage;
