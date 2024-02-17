import _ from "lodash";

const useFilters = ({
  defFilters = [],
  extend = null,
  force = true,
  setRouter = false,
  name = null,
  sort = null,
  page = null,
  limit = null,
}) => {
  const id = _.uniqueId();
  const router = useRouter();
  const route = name ?? useRoute()?.path;

  const filters = useState(`filters-${id}`, () => {
    return {};
  });

  const filtersHistory = useState("filtersHistory", () => {
    return {};
  });

  const filtersHistoryForm = useState("filtersHistoryForm", () => {
    return {};
  });

  const filterOptions = useState(`filter-options-${id}`, () => defFilters);

  const filterForm = useState(`filter-form-${id}`, () => {});

  const prepareForm = () => {
    try {
      const data = {};

      defFilters?.map(({ filter, name, type }) => {
        let key = name,
          filterVal = null,
          method = filter ?? "";

        if (_.isObject(filter)) {
          filterVal = filter.val;
          method = filter.method;
        }

        data[key] = filterVal;
        if (method === "IN") {
          data[key] = [];
        }
        if (method === "IN" && type == "checkbox") {
          data[key] = null;
        }
      });
      if (sort) {
        data.sort = sort;
      }
      if (limit) {
        data.limit = limit;
      }
      if (page) {
        data.page = page;
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const setFilterField = (field, val, idx) => {
    if (filterForm.value) {
      if (idx || typeof idx === "number") {
        filterForm.value[idx][field] = val;
      } else {
        filterForm.value[field] = val;
      }
    }
  };

  if (defFilters) {
    filterForm.value = prepareForm();
  }
  watch(
    () => defFilters,
    () => {
      filterOptions.value = defFilters;
    },
    { deep: true }
  );

  watch(
    () => filterForm.value,
    (val) => {
      setFilters();
    },
    { deep: true }
  );

  const setFilters = async () => {
    try {
      const data = {};

      if (extend) {
        data.extends = extend;
      }

      if (filterForm.value.hasOwnProperty("sort")) {
        data.sort = filterForm.value.sort;
      }
      if (filterForm.value.hasOwnProperty("page")) {
        data.page = filterForm.value.page;
      }
      if (filterForm.value.hasOwnProperty("page")) {
        data.page = filterForm.value.page;
      }
      if (filterForm.value.hasOwnProperty("limit")) {
        data.limit = filterForm.value.limit;
      }

      defFilters.map((def) => {
        const key = def.name;
        let method = def.filter;

        if (_.isObject(method)) {
          method = method.method;
        }

        if (
          (filterForm.value[key] == "" && method !== "NEQN") ||
          (filterForm.value[key] == " " && method !== "NEQN") ||
          !filterForm.value[key]
        ) {
          return;
        }

        if (method === "exec") {
          data[key] = filterForm.value[key];
          return;
        }

        if (method === "NEQN" && filterForm.value[key]) {
          if (def?.prepareKey) {
            data[
              `${def?.prepareKey(key, filterForm.value[key])}`
            ] = `${method}`;
          } else {
            data[`filter[${key}]`] = `${method}`;
          }
        } else {
          const pre = def?.prepareFunc
            ? def?.prepareFunc(filterForm.value[key], filterForm)
            : filterForm.value[key];
            
          if (pre == undefined) {
            return;
          }
          if (def?.prepareKey) {
            data[`${def?.prepareKey(key, pre, filterForm.value[key])}`] = pre;
          } else if (method) {
            data[`filter${method}[${key}]`] = pre;
          } else {
            data[`${key}`] = pre;
          }
        }
      });

      if (
        (!Object.keys(data).length && !force) ||
        (_.isEqual(data, filters.value) && !force)
      ) {
        return;
      }
      filters.value = data;
      filtersHistory.value[route] = filterForm.value;
      filtersHistoryForm.value[route] = data;

      if (setRouter) {
        router.push({
          query: {
            ...data,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearFilters = () => {
    filterForm.value = prepareForm();

    if (setRouter) {
      router.push({
        query: {},
      });
    }
  };

  const currentFilter = computed(() => {
    return filtersHistory.value.hasOwnProperty(route)
      ? filtersHistory.value[route]
      : {};
  });

  const currentFilterForm = computed(() => {
    return filtersHistoryForm.value.hasOwnProperty(route)
      ? filtersHistoryForm.value[route]
      : {};
  });

  const parseQuery = () => {
    Object.entries(useRoute().query).forEach(([key, val]) => {
      let keys = key.match(/\[(.*?)\]/) ? key.match(/\[(.*?)\]/)[1] : null;
      let value = val.match(/\((.*?)\)/) ? val.match(/\((.*?)\)/)[1] : null;
      if (key && value) {
        filterForm.value[keys] = value;
      }
    });
  };
  onMounted(() => {
    if (!useRouter()?.options?.history?.state?.back) {
      parseQuery();
    }
    setFilters();
  });

  onBeforeUnmount(() => {
    router.push({ query: null });
    clearFilters();
  });

  return {
    filters,
    filterOptions,
    filterForm: computed(() => filterForm.value),
    setFilterField,
    setFilters,
    clearFilters,
    filtersHistory,
    currentFilter,
    currentFilterForm,
    defFilters,
  };
};

export default useFilters;
