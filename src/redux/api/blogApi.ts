import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const BLOGS_URL = "/blogs";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //blogs list
    blogs: build.query({
      query: () => ({
        url: `${BLOGS_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    // isngle blog
    blog: build.query({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // blog create
    createBlog: build.mutation({
      query: (body) => ({
        url: `${BLOGS_URL}/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // blog update
    updateBlog: build.mutation({
      query: (paylod) => ({
        url: `${BLOGS_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // blog delete
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useBlogsQuery,
  useBlogQuery,
  useUpdateBlogMutation,
  useCreateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
