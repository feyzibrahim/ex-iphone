import { handleError } from "./configurations";
import axios from "axios";

// export const URL = "https://exiphones.shop/api";
export const URL = "http://localhost:4000/api";

const apiInstance = axios.create({
  baseURL: URL,
});

export const commonReduxRequest = async (
  method,
  route,
  body,
  config,
  rejectWithValue
) => {
  let requestConfig = {
    method,
    url: route,
    data: body,
    headers: config,
    withCredentials: true,
  };

  try {
    const response = apiInstance(requestConfig);

    return response;
  } catch (error) {
    return handleError(error, rejectWithValue);
  }
};
