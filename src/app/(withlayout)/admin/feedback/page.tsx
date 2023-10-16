"use client";

import SMBreadcrumb from "@/components/ui/Breadcrumb";
import SBTable from "@/components/ui/SBTable";
import ActionBar from "@/components/ui/actionBar";
import ViewModal from "@/components/ui/editModal";
import {
  useDeleteFeedbackMutation,
  useFeedbacksQuery,
} from "@/redux/api/feedbackApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined, EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const FeedbacePage = () => {
  const { role } = getUserInfo() as any;

  const [deleteFeedback] = useDeleteFeedbackMutation();
  const query: Record<string, any> = {};

  const [sige, setSige] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["page"] = page;
  query["limit"] = sige;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["search"] = searchTerm;

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["search"] = debouncedTerm;
  }

  const { data, isLoading, refetch } = useFeedbacksQuery({});

  const feedback = data?.data;
  // const meta = data?.meta;

  const deleteHandler = async (id: { id: string }) => {
    message.loading("Deleting Feedback...");
    try {
      const res = await deleteFeedback(id).unwrap();
      if (res?.success) {
        message.success("Feedback deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Feedmack Massage",
      dataIndex: "message",
      render: function (data: any) {
        return data?.slice(0, 50) + " ...";
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "150px",
            }}
          >
            {/* <Link href={`/${role}/feedback/edit/${data.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EditOutlined />
              </Button>
            </Link> */}
            <Button onClick={showModal} type="primary">
              <EyeOutlined />
            </Button>
            <ViewModal
              handleCancel={handleCancel}
              handleOk={handleOk}
              isModalOpen={isModalOpen}
              title="Feedback Massage"
            >
              {data?.message}
            </ViewModal>
            <Button onClick={() => deleteHandler(data?.id)} danger>
              <DeleteOutlined />
            </Button>
            {/* <Button onClick={() => console.log(data)}>
              <EyeOutlined />
            </Button> */}
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSige(pageSize);
  };
  const onTableChange = (pagination: any, filters: any, sorter: any) => {
    // console.log(pagination, "pagination");
    // console.log(filters, "filters");
    // console.log(field, "field" + " " + order, "order");

    const { field, order } = sorter;
    setSortBy(field);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  const resetFilter = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };
  return (
    <div>
      <SMBreadcrumb
        items={[
          {
            label: "Manage Feedback",
          },
        ]}
      />

      <ActionBar title="Manage Feedback">
        <Input
          type="text"
          size="large"
          placeholder="Search ..."
          style={{
            width: "300px",
            marginRight: "20px",
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          {/* <Link href={`/${role}/feedback/create`}>
            <Button type="primary">Create</Button>
          </Link> */}
          {(!!sortBy || !!sortOrder || searchTerm) && (
            <Button
              onClick={resetFilter}
              style={{
                margin: "0 5px",
              }}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <SBTable
        loading={isLoading}
        columns={columns}
        dataSource={feedback}
        // pageSize={sige}
        // totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default FeedbacePage;
