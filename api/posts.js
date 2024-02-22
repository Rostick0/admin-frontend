import useFetcher from "../utils/fetch";

const posts = {
  get: async ({ id, params }) => useFetcher().get(`/posts/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/posts/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/posts/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/posts`, params),
  create: async ({ data }) => useFetcher().post(`/posts`, data),
};

export default posts;
