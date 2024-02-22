// 
import useFetcher from "../utils/fetch";

const productUsers = {
  get: async ({ id, params }) => useFetcher().get(`/productUsers/${id}`, params),
  delete: async ({ id, params }) => useFetcher().delete(`/productUsers/${id}`, params),
  update: async ({ id, data, params }) =>
    useFetcher().patch(`/productUsers/${id}`, data, params),
  getAll: async ({ params }) => useFetcher().get(`/productUsers`, params),
  create: async ({ data }) => useFetcher().post(`/productUsers`, data),
};

export default productUsers;
