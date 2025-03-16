/*
	* range(4); // => [0, 1, 2, 3] 
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

function range(start, end, step) {
    const rStart = end === undefined ? 0 : start;
    const rEnd = end === undefined ? start : end;
    const rStep = step === undefined ? rStart > rEnd ? -1 : 1 : step;
    
    let iterations = Math.floor(Math.abs((rEnd - rStart) / (rStep === 0 ? 1 : rStep)));
    const result = new Array(iterations);
  
    for (let i = 0, value = rStart; i < iterations; i++, value += rStep) {
      result[i] = value;
    }
  
    return result;
  }
  