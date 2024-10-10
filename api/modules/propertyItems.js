import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) =>
    useFetcher().get(`/property_items/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/property_items/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/property_items/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/property_items`, params),
  create: async ({ data }) => useFetcher().post(`/property_items`, data),
};
