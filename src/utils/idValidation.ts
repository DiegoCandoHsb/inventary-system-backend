const ValidateId2 = (id: string): boolean => {
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

export function ValidateId(value: string): any {
  const id = [...value];
  if (+id[0].concat(id[1]) < 0 || +id[0].concat(id[1]) > 24 || +id[2] > 6) {
    return false;
  }

  const total = id
    .map(Number)
    .map((num, index) => {
      if (!Boolean(index % 2)) {
        const res = num * 2;
        return res >= 10 ? res - 9 : res;
      } else {
        return num * 1;
      }
    })
    .reduce((total, current) => total + current, 0);
  let decenasuperior = total;

  while (Boolean(decenasuperior % 10)) {
    decenasuperior += 1;
  }

  const result = decenasuperior - total;

  return result === 0;
}
