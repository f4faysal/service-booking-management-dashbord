"use client";
import { Modal } from "antd";
import React from "react";

interface ReusableModalProps {
  title: string;
  children: React.ReactNode;
  handleCancel: () => boolean | void;
  handleOk: () => boolean | void;
  isModalOpen: boolean;
}

const ViewModal: React.FC<ReusableModalProps> = ({
  title,
  children,
  handleCancel,
  handleOk,
  isModalOpen,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{
            fontSize: "16px",

            color: "#000000",
          }}
        >
          {children}
        </p>
      </Modal>
    </>
  );
};

export default ViewModal;
