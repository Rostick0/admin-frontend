import useFetcher from "../utils/fetch";

const todos = {
  get: async ({ id, params }) => useFetcher().get(`/todos/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/todos/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/todos/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/todos`, params),
  create: async ({ data }) => useFetcher().post(`/todos`, data),
};

export default todos;
