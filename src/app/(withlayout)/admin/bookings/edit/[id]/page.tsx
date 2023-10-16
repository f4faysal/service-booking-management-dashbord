"use client";

import Loading from "@/app/loading";
import Form from "@/components/forms/form";
import FormSelectField from "@/components/forms/formSelectField";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { statusOptions } from "@/constants/golobal";
import {
  useBookingQuery,
  useUpdatebookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const EditBookingPage = ({ params }: any) => {
  const id = params.id;

  const { role } = getUserInfo() as any;

  const { data, isLoading } = useBookingQuery(id);
  const boking = data?.data;
  console.log(boking);
  const [updatebooking] = useUpdatebookingMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding Service...");
    try {
      const res = await updatebooking({ body: data, id }).unwrap();
      console.log(res);
      console.log(data);
      if (res?.success) {
        message.success("Service Updeting successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    status: boking?.status,
  };
  if (isLoading) <Loading />;

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Booking",
            path: `/${role}/bookings`,
          },
          {
            label: "Update Booking Status",
          },
        ]}
      />

      <h1>Update Booking Status</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <p>Craunt Status: {boking?.status}</p>
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="status"
              label="Booking Status"
              options={statusOptions}
            />
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default EditBookingPage;
