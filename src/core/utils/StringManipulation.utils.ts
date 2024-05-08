const WordSeperator = (string: string, count: number) => {
  let output;
  const input = string.split(" ");
  for (let i = 0; i < input.length; i++) {
    input[i] = input[i] + " ";
  }
  if (input.length > count) {
    output = input.splice(0, count);
    output.push("...");
  } else {
    output = input;
  }
  return output;
};

export { WordSeperator };
