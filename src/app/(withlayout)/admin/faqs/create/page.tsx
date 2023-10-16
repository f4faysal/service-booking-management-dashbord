"use client";

import FormTextArea from "@/components/forms/FormTextArea.tsx";
import Form from "@/components/forms/form";
import FormInput from "@/components/forms/formInput";
import SMBreadcrumb from "@/components/ui/Breadcrumb";
import { useCreateFaqMutation } from "@/redux/api/faqsApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const CreateServicePage = () => {
  const { role } = getUserInfo() as any;
  // const [imageUrl, setImageUrl] = useState(
  //   "https://res.cloudinary.com/dhvuyehnq/image/upload/v1697354272/gcu3mnulmato2odnqqvp.png"
  // );

  const [createFaq] = useCreateFaqMutation();

  const onSubmit = async (data: any) => {
    message.loading("Adding Service...");
    try {
      const res = await createFaq(data).unwrap();

      if (res?.success) {
        message.success("Faq added successfully");
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
            label: "Manage Faqs",
            path: `/${role}/faqs`,
          },
          {
            label: "Create Faqs",
          },
        ]}
      />

      <h1>Create Faqs</h1>
      <Form submitHandler={onSubmit}>
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
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateServicePage;
