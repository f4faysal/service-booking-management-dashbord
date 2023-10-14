import { IMeta } from "@/types/common.js";
import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const USER_URL = "/user";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //user profile
    profile: build.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    //user profile update
    updateProfile: build.mutation({
      query: (profileData) => ({
        url: `${USER_URL}/profile`,
        method: "PATCH",
        data: profileData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //user profile delete
    deleteProfile: build.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    //super admin role update
    updateRoleBySuperAdmin: build.mutation({
      query: (data) => ({
        url: `/superadmin${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // users list
    usersList: build.query({
      query: (params) => ({
        url: `${USER_URL}/list`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          userlist: response?.data,
          meta: response.meta,
        };
      },

      providesTags: [tagTypes.user],
    }),

    // isngle user
    user: build.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useUsersListQuery,
  useUserQuery,
  useDeleteProfileMutation,
  useUpdateRoleBySuperAdminMutation,
} = userApi;
