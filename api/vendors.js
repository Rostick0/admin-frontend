import useFetcher from "../utils/fetch";

const vendors = {
  get: async ({ id, params }) => useFetcher().get(`/vendors/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/vendors/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/vendors/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/vendors`, params),
  create: async ({ data }) => useFetcher().post(`/vendors`, data),
};

export default vendors;
