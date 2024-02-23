import api from "~/api";

const useAuth = () => {
  const accessToken = useCookie("accessToken");
  const refreshToken = useCookie("refreshToken");
  const user = useState("user", () => null);
  const role = useState("role", () => null);
  const account = useState("account", () => null);

  const getUser = async (resetPassword) => {
    try {
      await api.auth
        .me(
          {
            extends:
              "contacts,country,image,flat_owners.user,alert,collection_relats.collection",
          },
          { Authorization: `Bearer ${accessToken.value}` }
        )
        .then((resp) => {
          if (!resp?.error) {
            user.value = resp.data;
            role.value = resp.data?.role;
            account.value = resp?.data?.account;

            if (resetPassword) {
              navigateTo({ name: "login-change-password" });
            }
            if (resp.data?.user?.full_name == "Гость") {
              logout({ to: `/` });
            }
          } else {
            resp?.popop();
            logout({ to: `/` });
          }
        })
        .catch(() => {
          logout({ to: `/` });
        });
    } catch (error) {
      console.error(error);
    }
  };

  const setAuth = (data, resetPassword) => {
    accessToken.value = data.access_token;
    refreshToken.value = data.refresh_token;
    getUser(resetPassword);
  };

  const logout = (params = {}) => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;

    if (params?.to) {
      navigateTo({ path: params.to });
    } else {
      navigateTo({ name: "index" });
    }
  };

  onMounted(async () => {
    if (accessToken.value && !user.value) {
      await getUser();
    }
  });

  const isAdmin = computed(() => {
    return user?.value?.role == "admin";
  });

  return {
    accessToken,
    setAuth,
    user,
    role,
    logout,
    isAdmin,
  };
};

export default useAuth;
