export const maskaOnlyNumber = {
  mask: "S*",
  tokens: "S:[0-9]:multiple",
};

export const maskaOnlyLetter = {
  mask: "S*",
  tokens: { S: { pattern: /^[a-zA-Z-а-яА-Я\s]*$/ } },
};

export const dateModelType = "YYYY-MM-DD";

export const dateTimeModelType = "yyyy-MM-dd HH:mm:ss";
