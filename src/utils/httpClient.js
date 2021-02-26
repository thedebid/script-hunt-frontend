import axios from "axios";
const BaseURL = "http://localhost:5000/api/v1/";

const http = axios.create({
  baseURL: BaseURL,
  responseType: "json",
});

function POST(url, data, params = {}) {
  /// console.log(data);
  return http.post(url, data, {
    params,
  });
}

export default {
  POST,
};
