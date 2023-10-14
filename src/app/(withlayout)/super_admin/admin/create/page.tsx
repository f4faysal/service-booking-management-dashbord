"use client";

import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { useCreatAdminMutation } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateAdminPage = () => {
  const { role } = getUserInfo() as any;

  //   const [addDepartment] = useAddDepartmentMutation();

  const [creatAdmin] = useCreatAdminMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding department...");
    try {
      const res = await creatAdmin(data);
      console.log(res);
      message.success("Department added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Admin",
            path: "/super_admin/admin",
          },
          {
            label: "Create",
          },
        ]}
      />

      <h1>Create Admin</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="name"
              label="Name"
              placeholder="Admin name"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="Admin Email"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="contactNumber"
              label="ContactNo"
              placeholder="Contact number"
              type="number"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="address"
              label="Address"
              placeholder="Enter Crrunt Address"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter Crrunt Address"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="profileImg"
              label="Link"
              placeholder="Profile Img link"
              size="large"
            />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          add
        </Button>
      </Form>
    </div>
  );
};

export default CreateAdminPage;
