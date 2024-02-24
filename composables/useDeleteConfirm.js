import { v4 } from "uuid";
import api from "~/api";

export default ({ apiName, get, close }) => {
  const deleteId = useState(v4(), () => null);

  const deleteConfirm = async () => {
    const res = await api[apiName].delete({
      id: deleteId.value,
    });

    if (res?.error) {
      warningPopup(res?.errorResponse?.data?.message);
    } else {
      get();
    }

    close();
    deleteId.value = null;
  };

  const deleteCancel = () => {
    close();
    deleteId.value = null;
  };

  return {
    deleteId,
    deleteConfirm,
    deleteCancel,
  };
};
