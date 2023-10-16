import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const FAQS_URL = "/faqs";

const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //faq list
    faqs: build.query({
      query: () => ({
        url: `${FAQS_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    // isngle Faq
    faq: build.query({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    // Faq create
    createFaq: build.mutation({
      query: (body) => ({
        url: `${FAQS_URL}/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // Faq   update
    updateFaq: build.mutation({
      query: (paylod) => ({
        url: `${FAQS_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // Faq delete
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useFaqsQuery,
  useFaqQuery,
  useUpdateFaqMutation,
  useCreateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
