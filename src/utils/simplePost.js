import axios from "axios";

const simplePost = (url, data) => {
  axios
    .post(url, { ...data })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default simplePost;
