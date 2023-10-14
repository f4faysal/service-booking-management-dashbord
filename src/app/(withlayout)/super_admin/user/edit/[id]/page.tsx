"use client";
import Form from "@/components/forms/form";
import FormSelectField from "@/components/forms/formSelectField";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { roleOptions } from "@/constants/golobal";
import {
  useUpdateRoleBySuperAdminMutation,
  useUserQuery,
} from "@/redux/api/user";
import { Button, Col, Row, message } from "antd";

type IDPorps = {
  params: any;
};

const EditAdminRole = ({ params }: IDPorps) => {
  const id = params.id;

  const [updateRoleBySuperAdmin] = useUpdateRoleBySuperAdminMutation();

  const { data, refetch } = useUserQuery(id);
  const role = data?.data?.role;
  const onSubmit = async (values: { title: string }) => {
    message.loading("Updating role...");
    try {
      const res = await updateRoleBySuperAdmin({ id, body: values }).unwrap();
      if (res?.success) {
        refetch();
        message.success("Department updated successfully");
      }
      console.log(values);
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  const defaultValues = { role: role };

  return (
    <div>
      <SMBreadcrumb
        items={[
          { label: "Manage Admin", path: "/user" },
          { label: "Edit Admin Role" },
        ]}
      />

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="role"
              label="User Role"
              options={roleOptions}
              placeholder="Select role"
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

export default EditAdminRole;
