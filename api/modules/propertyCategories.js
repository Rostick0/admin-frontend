import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) =>
    useFetcher().get(`/property_categories/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/property_categories/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/property_categories/${id}`, data, params),
  getAll: async ({ params }) =>
    useFetcher().get(`/property_categories`, params),
  create: async ({ data }) => useFetcher().post(`/property_categories`, data),
};
