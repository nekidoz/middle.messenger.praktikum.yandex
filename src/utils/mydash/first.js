// [1, 2, 3, 4] => 1

function first(list) {
    if (!Array.isArray(list) || list.length === 0) {
      return undefined;
    }
    return list[0];
  }
