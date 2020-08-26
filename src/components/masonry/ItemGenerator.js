import uniqueId from "lodash/uniqueId";
import sample from "lodash/sample";

let currentHue = 0;

export default count => {
  return new Array(count).fill("").map(() => {
    const id = uniqueId();
    currentHue = currentHue + 3;
    return {
      key: id,
      ratio: sample([4 / 3, 16 / 9, 1]),
      itemProps: {
        id,
        color: `hsl(${currentHue % 360}, 50%, 50%)`,
        color2: `hsl(${currentHue % 360}, 100%, 12%)`,
      }
    };
  });
};
