import { v4 } from "uuid";

export default (func, ms) => {
  const locked = useState(v4(), () => false);

  return function () {
    if (locked.value) return;

    const context = this;
    const args = arguments;

    locked.value = true;

    setTimeout(() => {
      func.apply(context, args);
      locked.value = false;
    }, ms);
  };
};
