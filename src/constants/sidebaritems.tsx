import type { MenuProps } from "antd";
import Link from "next/link";

import {
  ChromeOutlined,
  ClockCircleOutlined,
  SlidersOutlined,
  TableOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WarningOutlined,
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
      icon: <UserOutlined />,
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
      label: "Service Management",
      key: "service-management",
      icon: <SlidersOutlined />,
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
      label: "Booking Management",
      key: "booking-management",
      icon: <ClockCircleOutlined />,
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
      label: "Website Settings",
      key: "website-settings",
      icon: <ChromeOutlined />,
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
      icon: <UserDeleteOutlined />,
      children: [
        // {
        //   label: <Link href={`/${role}/roles`}>Roles</Link>,
        //   key: `/${role}/roles`,
        // },
        {
          label: <Link href={`/${role}/feedback`}>Feedback</Link>,
          key: `/${role}/customers`,
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
      icon: <UserSwitchOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <UserAddOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Manage permission",
      key: "manage-permission",
      icon: <WarningOutlined />,
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
