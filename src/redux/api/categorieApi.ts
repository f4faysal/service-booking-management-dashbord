import { tagTypes } from "../tag-types.ts";
import { baseApi } from "./baseApi";

const CATEGORIE_URL = "/categorie";

const categorieApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //categories list
    categories: build.query({
      query: () => ({
        url: `${CATEGORIE_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categorie],
    }),
    // isngle categorie
    categorie: build.query({
      query: (id) => ({
        url: `${CATEGORIE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categorie],
    }),

    // categorie create
    createCategorie: build.mutation({
      query: (body) => ({
        url: `${CATEGORIE_URL}/create`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.categorie],
    }),

    // categorie update
    updateCategorie: build.mutation({
      query: (paylod) => ({
        url: `${CATEGORIE_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.categorie],
    }),
    // Categorie delete
    deleteCategorie: build.mutation({
      query: (id) => ({
        url: `${CATEGORIE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categorie],
    }),
    // // users list
    // usersList: build.query({
    //   query: (params) => ({
    //     url: `${CATEGORIE_URL}/list`,
    //     method: "GET",
    //     params,
    //   }),
    // transformResponse: (response: any, meta: IMeta) => {
    //   return {
    //     userlist: response?.data,
    //     meta: response.meta,
    //   };
    // },
    //   providesTags: [tagTypes.user],
    // }),
  }),
});

export const {
  useCategoriesQuery,
  useCategorieQuery,
  useDeleteCategorieMutation,
  useUpdateCategorieMutation,
  useCreateCategorieMutation,
} = categorieApi;
