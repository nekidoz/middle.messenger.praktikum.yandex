/*
rangeRight(4); // => [3, 2, 1, 0]
rangeRight(-4); // => [-3, -2, -1, 0]
rangeRight(1, 5); // => [4, 3, 2, 1]
rangeRight(0, 20, 5); // => [15, 10, 5, 0]
rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
rangeRight(1, 4, 0); // => [1, 1, 1]	- в действительности будет [4, 4, 4]
rangeRight(0); // => []
*/

function rangeRight(start, end, step) {
    return range(start, end, step, true);
}

function range(start, end, step, isRight = false) {
  let rStart = end === undefined ? 0 : start;
  let rEnd = end === undefined ? start : end;
  let rStep = step === undefined ? rStart > rEnd ? -1 : 1 : step;
  
  let iterations = Math.floor(Math.abs((rEnd - rStart) / (rStep === 0 ? 1 : rStep)));
  const result = new Array(iterations);

  if (!isRight) {
    for (let i = 0, value = rStart; i < iterations; i++, value += rStep) {
      result[i] = value;
    }
  } else {
    for (let i = 0, value = rEnd - rStep; i < iterations; i++, value -= rStep) {
      result[i] = value;
    }
  }

  return result;
}
