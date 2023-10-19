"use client";

import SMBreadcrumb from "@/components/ui/Breadcrumb";
import SBTable from "@/components/ui/SBTable";
import ActionBar from "@/components/ui/actionBar";
import {
  useDeleteServicesMutation,
  useServicessQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { getUserInfo } from "@/services/auth.service";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ServicesPage = () => {
  const { role } = getUserInfo() as any;

  const [deleteServices] = useDeleteServicesMutation();
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

  const { data, isLoading, refetch } = useServicessQuery({ ...query });

  const services = data?.services;
  const meta = data?.meta;

  const deleteHandler = async (id: { id: string }) => {
    message.loading("Service deleted...");
    try {
      const res = await deleteServices(id).unwrap();
      if (res?.success) {
        message.success("Service deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Picture",
      render: function (data: any) {
        // return <img src={data?.profilePicture} alt="profile" width="50px" height="50px" />
        return <Avatar shape="square" size={50} src={data?.imageLink} />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Category",
      render: function (data: any) {
        return {
          children: data?.category?.title,
          props: {
            colSpan: 1,
          },
        };
      },
    },
    {
      title: "Tax",
      dataIndex: "tax",
      sorter: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
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
            <Link href={`/${role}/services/edit/${data.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EditOutlined />
              </Button>
            </Link>
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
            label: "Manage Services",

            path: "/admin/services",
          },
        ]}
      />

      <ActionBar title="Manage Services">
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
          <Link href={`/${role}/services/create`}>
            <Button type="primary">Create</Button>
          </Link>
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
        dataSource={services}
        pageSize={sige}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default ServicesPage;
