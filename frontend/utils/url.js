export const convertNameToUrl = (name) =>
  typeof name === "string"
    ? encodeURIComponent(
        name.toLowerCase().replace(new RegExp(" ", "g"), "_")
      )?.replace(new RegExp("%2F", "g"), "/")
    : "";
