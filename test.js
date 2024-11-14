function asd() {
  try {
    throw new Error('asd');
  } catch (error) {
    return new Error('asd123');
  }
}

let res = asd();
console.log(res);
