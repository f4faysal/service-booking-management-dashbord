import { IMeta } from "@/types/common.js";
import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const SERVICES_URL = "/services";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //servicess list
    servicess: build.query({
      query: (params) => ({
        url: `${SERVICES_URL}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any, meta: IMeta) => {
        return {
          services: response?.data?.data,
          meta: response?.data?.meta,
        };
      },
      providesTags: [tagTypes.services],
    }),
    // isngle services
    services: build.query({
      query: (id) => ({
        url: `${SERVICES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    // services create
    createServices: build.mutation({
      query: (body) => ({
        url: `${SERVICES_URL}/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.services],
    }),

    // services update
    updateServices: build.mutation({
      query: (paylod) => ({
        url: `${SERVICES_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.services],
    }),
    // services delete
    deleteServices: build.mutation({
      query: (id) => ({
        url: `${SERVICES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
    // // users list
    // usersList: build.query({
    //   query: (params) => ({
    //     url: `${SERVICES_URL}/list`,
    //     method: "GET",
    //     params,
    //   }),
    //   transformResponse: (response: any, meta: IMeta) => {
    //     return {
    //       userlist: response?.data,
    //       meta: response.meta,
    //     };
    //   },
    //   providesTags: [tagTypes.user],
    // }),
  }),
});

export const {
  useServicessQuery,
  useServicesQuery,
  useCreateServicesMutation,
  useUpdateServicesMutation,
  useDeleteServicesMutation,
} = servicesApi;
