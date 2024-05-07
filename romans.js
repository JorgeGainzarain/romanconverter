// Constants for the literals
const INVALID_ROMAN = 'Please enter a valid roman';
const INVALID_INTEGER = 'Please enter a valid integer';
const OUT_OF_RANGE = 'Out of range (1-3999)';

function init() {
  
  // Load elements once to avoid repetition on every invocation
  const modeCheckbox = document.querySelector("input[type='checkbox']");
  const header = document.querySelector('h1');
  const convertButton = document.querySelector('.convert-button');
  const outputArea = document.querySelector('.convert-output');
  const inputArea = document.querySelector("input[type='text']");


  modeCheckbox.addEventListener('change', function(e) {
    header.innerHTML = getModeTitle(e.target.checked);
  });

  function getModeTitle(integerToRoman) {
    return integerToRoman ? 'Integer To Roman' : 'Roman To Integer';
  }

  // Now, the conversion operation does only perform the operation. 
  // Things we have extracted to this listener: 
  // 1 - Read the UI inputs (inputArea.value)
  // 2 - Write the UI output (outputArea.innerHTML)
  // 3 - Show error messages
  // This is cleaner and also removes code duplications
  convertButton.addEventListener('click', function() {
    const inputValue = inputArea.value;
    const conversion = modeCheckbox.checked ? convertIntegerToRoman(inputValue) : convertRomanToInteger(inputValue);
    if (conversion.result) {
      outputArea.innerHTML = conversion.value;
    } else {
      alert(conversion.message);
    }
  });

}

// Now the conversion methods receive both an input argument instead
// of reading directly from the UI.
// On top of that, they return a JSON object instead of updating the
// UI directly. The JSON object contains the result (ok/nok), the value
// and an error message if needed
function convertRomanToInteger(roman) {

  const response = {
    value: 0,
    message: '',
    result: false
  };

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

  const arr = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

  const values = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let sum = 0;

  let prevIndex = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
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
}

// Now the conversion methods receive both an input argument instead
// of reading directly from the UI.
// On top of that, they return a JSON object instead of updating the
// UI directly. The JSON object contains the result (ok/nok), the value
// and an error message if needed
function convertIntegerToRoman(num) {

  const response = {
    value: 0,
    message: '',
    result: false
  };

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
    1: 'I',
    5: 'V',
    10: 'X',
    50: 'L',
    100: 'C',
    500: 'D',
    1000: 'M',
  };

  let count = 1;
  let str = '';
  while (num > 0) {
    const last = parseInt(num % 10);
    const repeatStr = repeatString(mapping[count], last);
    str = repeatStr + str;

    count *= 10;
    num = parseInt(num / 10);
  }

  response.value = str;
  response.result = true;

  return response;
}

// Custom function to repeat a string 'str' 'n' times
function repeatString(str, n) {
  return Array(n + 1).join(str);
}

init();
