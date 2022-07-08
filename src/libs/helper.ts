import { alertTimeoutInMs, nairaFormatter } from "../common/globals";

export const setValue = (value: any, field = "") => {
  let resVal = "";
  if (isNullOrUndefined(value) || isEmptyString(value)) {
    return "";
  }
  if (hasKey(value, "label")) {
    resVal = value["label"];
  } else {
    resVal = hasKeys(value)
      ? value[field] : (isObject(value) && !hasKeys(value) ? "" : value);
  }
  return resVal;
}

export const converterToCustomList = (obj: any, labelField: string, valueField: string, descriptionField?: string,) => {
  const returnArr = obj?.map((items: any) => {
    return {
      label: items[labelField],
      value: items[valueField],
      description: isNullOrUndefined(descriptionField) ? "" : items[descriptionField!]
    }
  });
  return returnArr;
}

export const cherryPickObject = (arrOfVals: any, objVal: any) => {
  let newObj: any = {};
  for (const [keys, values] of Object.entries(objVal)) {
    if (arrOfVals.includes(keys)) {
      newObj = Object.assign({}, newObj, {
        [keys]: values,
      });
    }
  }
  return newObj;
};

export const clearTimeouts = (timeOutId = 0) => {
  if (timeOutId > 0) {
    window.clearTimeout(timeOutId);
  } else {
    var noop = function () { },
      firstId = window.setTimeout(noop, 0);
    return function () {
      var lastId = window.setTimeout(noop, 0);
      console.log("Removing", lastId - firstId, "timeout handlers");
      while (firstId !== lastId) window.clearTimeout(++firstId);
    };
  }
};

export const responseCodes = {
  NO_RECORD_FOUND: "25",
  FAILED: "01",
  SUCCESSFUL: "00",
  BAD_REQUEST: "400",
  UNAUTHORIZED: "401",
  PAGE_NOT_FOUND: "404",
  SERVICE_UNAVAILABLE: "503"
};

export function formatNumber(n: any) {
  // format number 1000000 to 1,234,567
  if (isNullOrUndefined(n)) {
    return 0;
  }
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const splitString = (val: any, splitter: string) => {
  return isNullOrUndefined(val) ? "" : String(val).split(splitter).join(" ");
}
export const delayedPageNavigationTo = (url = "") => {
  setTimeout(() => {
    if (url.length > 0) {
      window.location.href = url;
      return;
    }
    window.location.reload();
  }, alertTimeoutInMs);
}

export const isEmptyString = (val: any) => {
  return isNullOrUndefined(val) || String(val).length === 0;
}

export const sanitizeAsNumber = (value: any) => {
  if (isNullOrUndefined(value))
    return 0;
  return value > 0 ? (String(value).startsWith("0") ? value.substring(1) : value) : 0
}

export const isValidDate = (value: any) => {
  if (isNullOrUndefined(value))
    return 0;
  if (isNumeric(value)) {
    let numValue = Number(value);
    return numValue > 0 && numValue <= 31 ? numValue : 0;
  }
  return 0;
}

export const isValidMonth = (value: any) => {
  if (isNullOrUndefined(value))
    return 0;
  if (isNumeric(value)) {
    let numValue = Number(value);
    return numValue > 0 && numValue <= 12 ? numValue : 0;
  }
  return 0;
}

export const isValidYear = (value: any) => {
  if (isNullOrUndefined(value))
    return 0;
  if (isNumeric(value)) {
    let numValue = Number(value);
    return numValue > 0 && value.length <= 4 ? numValue : 0;
  }
  return 0;
}

export const toUpperCase = (val: any) => {
  if (isNullOrUndefined(val)) {
    return "";
  }
  let strVal = String(val);
  return strVal.length > 0 ? strVal.toUpperCase() : "";
}

export const tokenizedUpperCase = (val: any, splitter = "", upperCasePos = 0) => {
  if (isNullOrUndefined(val)) {
    return "";
  }
  let strVal = String(val);
  if (strVal.length > 0) {
    let arrSplit = strVal.split(splitter);
    arrSplit[upperCasePos] = arrSplit[upperCasePos].toUpperCase();
    return arrSplit.join(" ");
  } else {
    return ""
  }
}

export const magicLoop = (count: number) => {
  let arr: any[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(i);
  }
  return arr;
}

export const toLowerCase = (val: any) => {
  if (isNullOrUndefined(val)) {
    return "";
  }
  let strVal = String(val);
  return strVal.length > 0 ? strVal.toLowerCase() : "";
}

export const defineChangeColor = (val: number) => {
  if (isNullOrUndefined(val)) {
    return "text-black";
  }
  return val > 0 ? "text-green-900" : "text-red-900";
}

export const capitaliseFirstLetter = (val: string) => {
  return isNullOrUndefined(val) ? "" : val.length > 1 ?
    val.charAt(0).toUpperCase().concat(val.substring(1).toLowerCase()) : val.toUpperCase();
}

export const hasKeys = (val: any) => {
  return !isNullOrUndefined(val) && Object.keys(val).length > 0
}

export const hasKey = (obj: any, val: any) => {
  return !isNullOrUndefined(obj) && Object.keys(obj).includes(val);
}

export const isSuccessful = (val: any) => {
  return (
    (val !== null && val !== undefined && (val === "00" || String(val) === "200")) ||
    val === true ||
    String(val).toLowerCase() === "successful"
  );
};

export const replaceItemAtIndex = (arr: any[], index: number, newValue: any) => {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export const removeItemAtIndex = (arr: any[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export const insertItemsStartingAt = (arr: any[], index: any, ...newItems: any[]) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index)
]


export const isNumeric = (num: any) => (typeof (num) === 'number' ||
  (typeof (num) === "string" && num.trim() !== '')) && !isNaN(num as number);

export const buildUrlPaths = (pathVariables: string[]) => {
  let res = "";
  for (let i = 0; i < pathVariables.length; i++) {
    if (i !== 0) {
      res += "/";
    }
    res += pathVariables[i];
  }
  return res;
}

export const buildUrlParams = (url: string, pathParams: string[]) => {
  if (pathParams.length % 2 !== 0) {
    throw new Error("Path parameters and value must be evenly structured");
  }
  url += "?";
  for (let i = 0; i < pathParams.length; i += 2) {
    if (i !== 0) {
      url += "&";
    }
    url = url.concat(pathParams[i], "=", pathParams[i + 1]);
  }
  return url;
}

export const camelCaseToSentenceCase = (val: string) => {
  let res = "";
  try {
    if (!isEmptyString(val)) {
      res = val.replace(/([a-zA-Z])(?=[A-Z])/g, "$1 ");
      res = capitaliseFirstLetter(res)
    }
  } catch (error) {
    console.log("ERROR OCCURRED WHILE PARSING:::", error);
  }

  return res;
};

export const shortenString = (val: string, addEllipsis?: true, desiredLength = 250) => {
  if (isNullOrUndefined(val)) {
    return "";
  }
  let string = val.length > desiredLength ? val.substring(0, desiredLength) : val
  return addEllipsis ? string.concat("...") : string;
}

export const isObject = (item: any) => {
  return (
    typeof item === "object" &&
    !Array.isArray(item) &&
    item !== null &&
    item !== undefined
  );
};

export const isNullOrUndefined = (val: any) => {
  return val === null || val === undefined;
}
export const replaceSign = (val: any) => {
  if (isNullOrUndefined(val)) {
    return "";
  }
  let valAsString = String(val);
  return valAsString.includes("-") ? valAsString.replace("-", "") : valAsString;
}
export const formatCurrencyWithDecimal = (amount: any) => {
  // @ts-ignore
  if (isNullOrUndefined(amount) || isEmptyString(amount) || isNaN(amount)) {
    return "0";
  }

  let formattedAmount = nairaFormatter.format(amount);
  let removeNGN = formattedAmount.replace('NGN', '').trim();
  return removeNGN;
};

export const addOverflowAndPaddingToModalBody = () => {
  // @ts-ignore
  let bdy = document.querySelector("body") as HTMLBodyElement;
  bdy.style.overflow = "hidden";
  bdy.style.paddingRight = "17px";
};

export const removeOverflowAndPaddingFromModalBody = () => {
  // @ts-ignore
  let bdy = document.querySelector("body") as HTMLBodyElement;
  bdy.style.overflow = "";
  bdy.style.paddingRight = "";
};
export const getCustomerInfo = (infoKey: string) => {
  // @ts-ignore
  let customer = JSON.parse(sessionStorage.getItem(infoKey) as string);
  return customer;
};
export const generateRandomString = (stringLength: number) => {
  // @ts-ignore
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};



export const maskCreditCardInput = (value: any, limit: any, separator: any) => {
  let output = [];

  for (let i = 0; i < value.length; i++) {

    if (i !== 0 && i % limit === 0) {
      output.push(separator);
    }

    output.push(value[i]);
  }

  return output.join("");
};

export const unmaskCreditCardInput = (value: any) => {
  return value.replace(/[^\d]/g, '');
}

export const showCreditCardTypeBasedOnCardNumber = (ccValue: any) => {
  let ccCardType = '';

  let ccCardTypePatterns: any = {
    amex: /^3/,
    visa: /^4/,
    mastercard: /^5/,
    disc: /^6/,
    generic: /(^1|^2|^7|^8|^9|^0)/,
  };

  for (const cardType in ccCardTypePatterns) {
    if (ccCardTypePatterns[cardType].test(ccValue)) {
      ccCardType = cardType;
      break;
    }
  }

  let activeCC = document.querySelector('.cc-types__img--active');

  let newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

  if (activeCC) {
    activeCC.classList.remove('cc-types__img--active');
    activeCC.classList.add('hidden');
  }

  if (newActiveCC) {
    newActiveCC.classList.add('cc-types__img--active');
    newActiveCC.classList.remove('hidden');
  }
};

export const sortBy = (a: any, b: any, sortBy: string) => {
  const dateA = a[sortBy];
  const dateB = b[sortBy];

  let comparison = 0;

  if (dateA < dateB) {
    comparison = 1;
  } else if (dateA > dateB) {
    comparison = -1;
  }

  return comparison;
}
export const filterData = (allData: any[], filterBy: string, filterType: any) => {

  if (Array.isArray(filterType)) {
    return allData.filter((el: any) => filterType.includes(el[filterBy]?.toLowerCase()));
  }
  return allData.filter((el: any) => el[filterBy]?.toLowerCase() === filterType);
}

export const containsAll = (arr1: any, arr2: any) => arr2.every((element: any) => {
  return arr1.includes(element);
});


