const setFieldsForm = (properties) =>
  properties?.map((property, i) => {
    const dataItem = {
      type: property?.type,
      name: "property." + i,
      modelValue: null,

      bind: {
        label: `${property?.name} ${property?.unit ?? ""}`.trimEnd(),
        // placeholder: "Введите название",
      },
    };

    if (property?.type === "select") {
      dataItem.bind.options = property?.property_values;
    }

    return dataItem;
  });

export default ({ initialProperty }) => {
  const propertyValues = useState(
    "propertyValues",
    () => setFieldsForm(initialProperty)
    // initialProperty?.map((property, i) => ())
  );

  return { propertyValues };
};
