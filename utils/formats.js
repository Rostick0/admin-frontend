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

export function phoneFormat(str) {
  try {
    if (!str?.length || str?.length < 10 || str?.length > 11) {
      return "";
    }

    if (str.length == 10) {
      const numbers = str
        .replace(/\D+/g, "")
        .replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 $1 $2 $3 $4");

      return numbers;
    }
    const numbers = str
      .replace(/\D+/g, "")
      .replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3 $4 $5");

    return numbers;
  } catch (error) {
    console.error(error);
  }
}

export function numberFormat(number, dec = true) {
  var decimalSeparator = ".";
  var thousandSeparator = " ";
  var result = String(number);

  var parts = result?.split(decimalSeparator);

  result = parts[0].split("").reverse().join("");
  result = result.replace(/(\d{3}(?!$))/g, "$1" + thousandSeparator);

  parts[0] = result.split("").reverse().join("");

  if (parts.length == 2 && typeof parts[1] == "string") {
    parts[1] = parts[1].substr(0, 2);
  }

  return dec ? parts.join(decimalSeparator) : parts[0];
}

export const numberClear = (str) => {
  try {
    if (typeof str == "number") {
      return str;
    } else if (str && typeof str == "string" && str?.length > 1) {
      const pre = str?.replace(/[^0-9]/g, "");
      return pre ? parseInt(pre) : "";
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
  }
};

export function clearPhone(str, start) {
  try {
    const numbers = str.replace(/\D+/g, "").replace(/(\d{1})/, start || "8");
    return numbers;
  } catch (error) {
    console.error(error);
  }
}
