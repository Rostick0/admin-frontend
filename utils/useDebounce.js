import { v4 } from "uuid";

export default (func, ms) => {
  let timer = useState(v4(), () => null);

  const fn = async (...params) => {
    clearTimeout(timer.value);

    timer.value = setTimeout(async () => {
      await func(...params);
    }, ms);
  };

  return fn;
};
