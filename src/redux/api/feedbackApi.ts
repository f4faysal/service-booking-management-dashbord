import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const FEEDBACK_URL = "/feedback";

const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //feedback list
    feedbacks: build.query({
      query: () => ({
        url: `${FEEDBACK_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),
    // isngle feedback
    feedback: build.query({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedback],
    }),

    // feedback create
    createFeedback: build.mutation({
      query: (body) => ({
        url: `${FEEDBACK_URL}/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // feedback   update
    updateFeedback: build.mutation({
      query: (paylod) => ({
        url: `${FEEDBACK_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
    // feedback delete
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedback],
    }),
  }),
});

export const {
  useFeedbacksQuery,
  useFeedbackQuery,
  useUpdateFeedbackMutation,
  useCreateFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
