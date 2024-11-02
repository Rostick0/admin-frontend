const setFieldsForm = (properties, productProperty) =>
  properties?.map((property, i) => {
    const dataItem = {
      type: property?.type,
      name: "property." + i,
      property_id: property?.id,

      bind: {
        label: `${property?.name} ${property?.unit ?? ""}`.trimEnd(),
      },
    };

    if (property?.type === "checkbox") {
      dataItem.bind.title = `${property?.name} ${
        property?.unit ?? ""
      }`.trimEnd();

      dataItem.modelValue = !!productProperty?.find(
        (item) => item?.property_id == property?.id
      );
      dataItem.bind.label = null;
    } else if (property?.type === "select") {
      dataItem.bind.options = property?.property_values;

      const current = productProperty?.find(
        (item) => item?.property_id == property?.id
      )?.property_value_id;

      dataItem.modelValue = property?.property_values?.find(
        (item) => item?.id === current
      );
    } else {
      dataItem.bind.modelValue = productProperty?.find(
        (item) => item?.property_id == property?.id
      )?.value;
    }

    return dataItem;
  });

const setPropertyValue = (propertyValues) => {
  const data = [];

  propertyValues?.forEach((item) => {
    if (!item?.modelValue) return;

    const dataItem = {
      property_id: item?.property_id,
    };

    if (item?.type === "input") {
      dataItem.value = item?.modelValue;
    } else if (item?.type === "select") {
      dataItem.property_value_id = item?.modelValue?.id;
    }

    data.push(dataItem);
  });

  return data;
};

export default ({ initialProperty, productProperty }) => {
  const propertyValues = ref(
    setFieldsForm(initialProperty, productProperty)
    // initialProperty?.map((property, i) => ())
  );

  // JSON.stringify
  const convertPropertyValues = () =>
    JSON.stringify(setPropertyValue(propertyValues.value));

  // const clearPropertyValues = () => (propertyValues.value = []);

  const rebuildProperties = (properties, productProperty) =>
    (propertyValues.value = setFieldsForm(properties, productProperty));

  return {
    propertyValues,
    convertPropertyValues,
    // clearPropertyValues,
    rebuildProperties,
  };
};
