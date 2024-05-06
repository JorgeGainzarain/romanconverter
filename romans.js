// Constants for the literals
const INVALID_ROMAN = "Please enter a valid roman";
const INVALID_INTEGER = "Please enter a valid integer";
const OUT_OF_RANGE = "Out of range (1-3999)";

function init() { 
  
  // Load elements once to avoid repetition on every invocation
  var modeCheckbox = document.querySelector("input[type='checkbox']");
  var header = document.querySelector("h1");
  var convertButton = document.querySelector(".convert-button");
  var outputArea = document.querySelector(".convert-output");
  var inputArea = document.querySelector("input[type='text']");


  modeCheckbox.addEventListener("change", function(e) {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  function getModeTitle(integerToRoman) {
    return integerToRoman ? "Integer To Roman" : "Roman To Integer";
  }

  // Now, the convertion operation does only perform the operation. 
  // Things we have extracted to this listener: 
  // 1 - Read the UI inputs (inputArea.value)
  // 2 - Write the UI output (outputArea.innerHTML)
  // 3 - Show error messages
  // This is cleaner and also removes code duplications
  convertButton.addEventListener("click", function() {
    var inputValue = inputArea.value;
    var convertion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (convertion.result) {
      outputArea.innerHTML = convertion.value;
    } else {
      alert(convertion.message);
    }
  });

};

// Now the convertion methods receive both an input argument instead
// of reading directly from the UI.
// On top of that, they return a JSON object instead of updating the
// UI directly. The JSON object contains the result (ok/nok), the value
// and an error message if needed
function convertRomanToInteger(roman) {

  var response = {
    value: 0, 
    message: '',
    result: false 
  }

  // Regexp to check if a string is a valid roman number
  const romanNumeralRegex = new RegExp(
    /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
  );

  // Convert the string to uppercase so we just to handle uppercase strings
  roman = roman.toUpperCase();
  const regexResult = romanNumeralRegex.test(roman);

  // Either the string is not a valid roman number or is empty
  if (!regexResult || roman.length <= 0) {
    response.message = INVALID_ROMAN;
    return response;
  }

  var arr = ["I", "V", "X", "L", "C", "D", "M"];

  var values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  var sum = 0;

  var prevIndex = 0;

  for (var i = roman.length - 1; i >= 0; i--) {
    if (arr.indexOf(roman[i]) >= prevIndex) {
      sum = sum + values[roman[i]];
    } else {
      sum = sum - values[roman[i]];
    }

    prevIndex = arr.indexOf(roman[i]);
  }

  response.value = sum;
  response.result = true;

  return response;
};

// Now the convertion methods receive both an input argument instead
// of reading directly from the UI.
// On top of that, they return a JSON object instead of updating the
// UI directly. The JSON object contains the result (ok/nok), the value
// and an error message if needed
function convertIntegerToRoman(num) {

  var response = {
    value: 0,
    message: '', 
    result: false 
  }

  // Regexp to check the input is a valid integer
  const numberRegex = new RegExp(/^\d+$/);

  const regexResult = numberRegex.test(num);

  // Not an integer -> we exit with the appropriate message
  if (!regexResult) {
    response.message = INVALID_INTEGER;
    return response;
  }

  // Integer not in the supported range -> exit with the right message
  if (Number(num) > 3999 || Number(num) < 1) {
    response.message = OUT_OF_RANGE;
    return response;   
  }

  const mapping = {
    1: "I",
    5: "V",
    10: "X",
    50: "L",
    100: "C",
    500: "D",
    1000: "M",
  };

  var count = 1;
  var str = "";
  while (num > 0) {
    var last = parseInt(num % 10);
    last *= count;
    if (last < 10) {
      str += lessThan9(last, mapping);
    } else {
      str = greaterThan9(last, mapping) + str;
    }

    count *= 10;
    num = parseInt(num / 10);
  }

  response.value = str;
  response.result = true;

  return response;
};

function lessThan9(num, mapping) {
  if (num === 9) {
    return mapping[1] + mapping[10];
  } else if (num >= 5 && num < 9) {
    return mapping[5] + mapping[1].repeat(num % 5);
  } else if (num === 4) {
    return mapping[1] + mapping[5];
  } else {
    return mapping[1].repeat(num);
  }
};

const greaterThan9(num, mapping) {
  if (num >= 10 && num < 50) {
    if (num === 10) {
      return mapping[10];
    }

    if (num === 40) {
      return mapping[10] + mapping[50];
    } else {
      return mapping[10].repeat(parseInt(num / 10));
    }
  } else if (num >= 50 && num < 100) {
    if (num === 50) {
      return mapping[50];
    }

    if (num === 90) {
      return mapping[10] + mapping[100];
    } else {
      return mapping[50] + mapping[10].repeat(parseInt((num - 50) / 10));
    }
  } else if (num >= 100 && num < 500) {
    if (num === 100) {
      return mapping[100];
    }

    if (num === 400) {
      return mapping[100] + mapping[500];
    } else {
      return mapping[100].repeat(parseInt(num / 100));
    }
  } else if (num >= 500 && num < 1000) {
    if (num === 500) {
      return mapping[500];
    }

    if (num === 900) {
      return mapping[100] + mapping[1000];
    } else {
      return mapping[500] + mapping[100].repeat(parseInt((num - 500) / 100));
    }
  } else if (num >= 1000 && num < 5000) {
    if (num === 1000) {
      return mapping[1000];
    }

    return mapping[1000].repeat(parseInt(num / 1000));
  }
};
