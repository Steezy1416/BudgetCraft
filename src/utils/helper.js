export const GetPercentage = (totalBalance, categoryTotal) => {
  if (totalBalance === 0.0 && categoryTotal === 0) {
    return 0;
  }
  if (Math.sign(categoryTotal) === -1) {
    return 0;
  }
  if (categoryTotal === 0) {
    return 0;
  }
  if (categoryTotal > totalBalance) {
    return Math.round((categoryTotal / categoryTotal) * 100);
  }

  return Math.round((categoryTotal / totalBalance) * 100);
};

export const GetTotalBalance = (expensesTotal, personalBalance, savings) => {
  const total = expensesTotal + personalBalance + savings;
  const formatedTotal = total.toFixed(2);
  return parseFloat(formatedTotal);
};

export const formatNumber = (number) => {
  const [wholeNumbers, decimals] = number.toString().split(".");
  const numberLength = wholeNumbers.length;

  let formatedNumber = "";
  let seperatorCounter = 3;

  if(!wholeNumbers){
    formatedNumber = "0"
  }
  else if (numberLength > 3) {
    for (let i = numberLength - 1; i >= 0; i--) {
      if (seperatorCounter === 1 && i > 0) {
        formatedNumber = `,${wholeNumbers[i]}` + formatedNumber;
        seperatorCounter = 3;
      } else {
        formatedNumber = wholeNumbers[i] + formatedNumber;
        seperatorCounter--;
      }
    }
  } else {
    formatedNumber += wholeNumbers;
  }

  if (decimals) {
    if (decimals.length === 1) {
      formatedNumber += `.${decimals}0`;
    } else {
      formatedNumber += `.${decimals}`;
    }
  } else {
    formatedNumber += ".00";
  }

  return formatedNumber;
};
