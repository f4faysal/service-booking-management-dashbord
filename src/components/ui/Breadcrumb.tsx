import { Breadcrumb } from "antd";
import Link from "next/link";

import { HomeOutlined } from "@ant-design/icons";

const SMBreadcrumb = ({
  items,
}: {
  items: {
    label: string;
    path?: string;
  }[];
}) => {
  const breadCrumbItem = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.path ? (
          <Link href={item.path}>{item.label}</Link>
        ) : (
          <samp>{item.label}</samp>
        ),
      };
    }),
  ];
  return <Breadcrumb items={breadCrumbItem} />;
};

export default SMBreadcrumb;
