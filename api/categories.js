import useFetcher from "../utils/fetch";

const categories = {
  get: async ({ id, params }) => useFetcher().get(`/categories/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/categories/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/categories/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/categories`, params),
  create: async ({ data }) => useFetcher().post(`/categories`, data),
};

export default categories;
