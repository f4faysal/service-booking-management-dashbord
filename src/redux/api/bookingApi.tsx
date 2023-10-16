import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const BOOKING_URL = "/bookings";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //bookings list
    bookings: build.query({
      query: (params) => ({
        url: `${BOOKING_URL}`,
        method: "GET",
      }),

      providesTags: [tagTypes.booking],
    }),
    // isngle services
    booking: build.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    // booking create
    createbooking: build.mutation({
      query: (body) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // booking update
    updatebooking: build.mutation({
      query: (paylod) => ({
        url: `${BOOKING_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // booking delete
    deletebooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useBookingsQuery,
  useBookingQuery,
  useCreatebookingMutation,
  useUpdatebookingMutation,
  useDeletebookingMutation,
} = bookingApi;
