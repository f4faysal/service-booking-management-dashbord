"use client";

import Loading from "@/app/loading";
import FormTextArea from "@/components/forms/FormTextArea.tsx";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { useFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqsApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const EditFaqsPage = ({ params }: any) => {
  const id = params.id;

  const { role } = getUserInfo() as any;

  const { data, isLoading, refetch } = useFaqQuery(id);

  const faq = data?.data;

  const [updateFaq] = useUpdateFaqMutation();

  const onSubmit = async (data: any) => {
    message.loading("Updating Blog...");
    try {
      console.log(data);
      const res = await updateFaq({ body: data, id }).unwrap();
      console.log(res);
      if (res?.success) {
        message.success("Blog Update successfully");
        refetch();
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const defaultValues = {
    question: faq?.question,
    answer: faq?.answer,
  };
  if (isLoading) <Loading />;

  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Blog",
            path: `/${role}/blogs`,
          },
          {
            label: "Update Blog",
          },
        ]}
      />

      <h1>Update Faq</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              name="question"
              label="Faqs Question"
              type="text"
              placeholder="Faqs Question"
              size="large"
            />
          </Col>
        </Row>

        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea
              name="answer"
              label="Faqs Answer"
              placeholder="Faqs Answer"
            />
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditFaqsPage;
