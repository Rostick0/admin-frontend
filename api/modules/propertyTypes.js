import useFetcher from "../../utils/fetch";

export default {
  get: async ({ id, params }) =>
    useFetcher().get(`/property_types/${id}`, params),
  delete: async ({ id, params }) =>
    useFetcher().delete(`/property_types/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/property_types/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/property_types`, params),
  create: async ({ data }) => useFetcher().post(`/property_types`, data),
};
