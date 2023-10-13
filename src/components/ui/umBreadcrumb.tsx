import { Breadcrumb } from "antd";
import Link from "next/link";

import { HomeOutlined } from "@ant-design/icons";

const UMBreadcrumb = ({
  items,
}: {
  items: {
    lable: string;
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
          <Link href={item.path}>{item.lable}</Link>
        ) : (
          <samp>{item.lable}</samp>
        ),
      };
    }),
  ];
  return <Breadcrumb items={breadCrumbItem} />;
};

export default UMBreadcrumb;
