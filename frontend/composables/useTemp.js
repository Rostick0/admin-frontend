export default ({ name }) => {
  const tempData = useState(name, () => []);

  const tempDataAdd = (data) => {
    tempData.value = [...tempData.value, data];
  };

  return {
    tempData,
    tempDataAdd,
  };
};
