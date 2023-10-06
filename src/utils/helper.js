export const GetPercentage = (totalBalance, categoryTotal) => {
    if(totalBalance === 0.00 && categoryTotal === 0){
        return 0
    }
  return Math.round((categoryTotal / totalBalance) * 100);
};

export const GetTotalBalance = (expensesTotal, personalBalance, savings) => {
    console.log(typeof expensesTotal, typeof personalBalance, typeof savings)
  const total = expensesTotal + personalBalance + savings;
  const formatedTotal = total.toFixed(2)
    console.log(parseFloat(formatedTotal))
    return parseFloat(formatedTotal)
};
