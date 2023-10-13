import type { AxiosError, AxiosRequestConfig } from "axios";

import { IMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      meta?: IMeta;
      contentTypes?: string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, contentTypes }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ContentType: contentTypes || "application/json",
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
