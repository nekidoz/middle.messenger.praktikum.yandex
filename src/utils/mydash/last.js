// [1, 2, 3, 4] => 4

function last(list) {
    if (!Array.isArray(list) || list.length === 0) {
  return undefined;
}
return list[list.length - 1];
}