import type { MenuProps } from "antd";
import Link from "next/link";

import {
  AppstoreOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/dashboard`}>Dashboard</Link>,
      icon: <TableOutlined />,
      key: `/dashboard`,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/profile/edit`}>Edit Profile</Link>,
          key: `/${role}/profile/edit`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-admin`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: "Booking Management",
      key: "booking-management",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/bookings`}>Bookings</Link>,
          key: `/${role}/bookings`,
        },
        {
          label: <Link href={`/${role}/reports`}>Reports</Link>,
          key: `/${role}/reports`,
        },
      ],
    },
    {
      label: "Business Management",
      key: "business-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/feedback`}>Feedback</Link>,
          key: `/${role}/customers`,
        },
        {
          label: <Link href={`/${role}/working-hours`}>Working Hours</Link>,
          key: `/${role}/working-hours`,
        },
      ],
    },
    {
      label: "Service Management",
      key: "service-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/categories`}>Categories</Link>,
          key: `/${role}/categories`,
        },
        {
          label: <Link href={`/${role}/services`}>Services</Link>,
          key: `/${role}/services`,
        },
      ],
    },
    {
      label: "Website Settings",
      key: "website-settings",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blogs`}>Blogs</Link>,
          key: `/${role}/blogs`,
        },
        {
          label: <Link href={`/${role}/faqs`}>FAQs</Link>,
          key: `/${role}/faqs`,
        },
      ],
    },
    {
      label: "Users & Role Management",
      key: "users-role-management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/roles`}>Roles</Link>,
          key: `/${role}/roles`,
        },
        {
          label: <Link href={`/${role}/user`}>User</Link>,
          key: `/${role}/user`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Manage permission",
      key: "manage-permission",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/permission`}>View permissions</Link>,
          key: `/${role}/permission`,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
