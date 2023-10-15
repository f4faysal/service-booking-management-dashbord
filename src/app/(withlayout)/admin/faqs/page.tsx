"use client";

import Form from "@/components/forms/form";
import ImageUpload from "@/components/ui/image-upload";
import { Avatar, Button, message } from "antd";
import { useState } from "react";

const FAQs = () => {
  const [imageUrl, setImageUrl] = useState("");
  console.log(imageUrl);

  const onSubmit = async (values: { images: any }) => {
    // Your form submission logic, including handling uploaded images
    message.loading("Updating role...");
    try {
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>FAQs</h1>
      <Form submitHandler={onSubmit}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
      <Avatar size={200} src={imageUrl} />

      <ImageUpload setImageUrl={setImageUrl} imageUrl={imageUrl} />
    </div>
  );
};

export default FAQs;
