import { v4 } from "uuid";

export default (_cols, { resizeCallback }) => {
  const table = useState(v4(), () => null);
  const cols = useState(v4(), () => []);

  const mouseDownPos = ref();

  const mouseDownHandler = (e, col) => {
    if (!col.width) {
      col.width = e.target?.parentNode?.parentNode?.offsetWidth ?? 0;
    }

    col.mouseDownWidth = col.width;

    col.mouseDown = true;
    mouseDownPos.value = e.clientX;

    const mouseMoveEventListener = (e) => {
      if (!col.mouseDown) return;
      
      const width = col.mouseDownWidth + (e.clientX - mouseDownPos.value);
      if (
        width > 80 &&
        width <= 750
        // && cols.value.reduce((acc, i) => i.width + acc, -col.width) + width < 1400
      ) {
        col.width = width;
      } else if (width <= 80) {
        col.width = 80;
      }
      // else {
      //   col.width =
      //     1400 - cols.value.reduce((acc, i) => {
      //       if (col.id == i.id){
      //         return acc
      //       }
      //       return i.width + acc
      //     },0);
      // }
    };
    window.addEventListener("mousemove", mouseMoveEventListener);

    const mouseUpEventListener = (e) => {
      col.mouseDown = false;
      window.removeEventListener("mouseup", mouseUpEventListener);
      window.removeEventListener("mouseup", mouseMoveEventListener);
      resizeCallback(col.name, col.width);
    };
    window.addEventListener("mouseup", mouseUpEventListener);
  };

  const mouseDownAuto = (e, col) => {
    col.mouseDownWidth = col.width;

    col.mouseDown = true;
    mouseDownPos.value = e.clientX;

    const mouseMoveEventListener = (e) => {
      if (!col.mouseDown) return;

      col.width = null;
    };
    window.addEventListener("mousemove", mouseMoveEventListener);

    const mouseUpEventListener = (e) => {
      col.mouseDown = false;
      window.removeEventListener("mouseup", mouseUpEventListener);
      window.removeEventListener("mouseup", mouseMoveEventListener);
      resizeCallback(col.name, col.width);
    };
    window.addEventListener("mouseup", mouseUpEventListener);
  };

  const restore = async (_cols) => {
    cols.value = _cols.map((i) => ({ ...i, width: i?.width ?? "" }));
  };

  onMounted(async () => {
    await restore(_cols);
  });

  return {
    table,
    cols,
    restore,
    mouseDownHandler,
    mouseDownAuto,
  };
};
