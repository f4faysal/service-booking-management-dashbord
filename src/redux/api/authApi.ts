import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    creatAdmin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/superadmin/user`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useUserLoginMutation, useCreatAdminMutation } = authApi;
