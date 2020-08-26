import axios from "axios";
import { sampleSize } from "lodash";

export default async () => {
  return new Promise((resolve, reject) => {
    axios.get("https://picsum.photos/list").then(res => {
      console.log(res.data[0]);
      return resolve(sampleSize(res.data, 50));
    });
  });
};
