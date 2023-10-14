import { Modal } from "antd";
import React from "react";

interface ReusableModalProps {
  visible: boolean;
  title: string;
  content: React.ReactNode;
  onOk: () => void;
  onCancel: () => void;
  okText: string;
  cancelText: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  visible,
  title,
  content,
  onOk,
  onCancel,
  okText,
  cancelText,
}) => {
  return (
    <>
      <Modal
        title={title}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText={okText}
        cancelText={cancelText}
      >
        {content}
      </Modal>
    </>
  );
};

export default ReusableModal;
