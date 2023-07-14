export const ValidateId = (id: string): boolean => {
  const productsResults: number[] = [];

  let claeredResults: number[] = [];

  let addAllDigits = 0;

  // Validate id with results
  const finalResult = function (): boolean {
    const ceilDigit = Math.ceil(addAllDigits * 0.1) * 10;
    const result = ceilDigit - addAllDigits;

    if (result === claeredResults[claeredResults.length - 1]) {
      return true;
    }

    return false;
  };

  //string id to digits array
  const idDigits: number[] = id.split('').map((digit) => Number(digit));

  // module 10
  idDigits.forEach((num, index) => {
    if ((index + 1) % 2 === 0) {
      productsResults.push(num);
    } else {
      const result = num * 2;
      productsResults.push(result);
    }
  });

  // check numbers greater than 10
  claeredResults = productsResults.map((num, index) => {
    if (num >= 10) return num - 9;
    if (num < 10 || index === 9) return num;
  });

  // change all digits sum
  addAllDigits = claeredResults.reduce((prev, total, index) => {
    if (index === 9) return prev + 0;

    return prev + total;
  }, 0);

  return finalResult();
};
