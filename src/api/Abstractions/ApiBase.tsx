import axios from "axios";
import autoBind from "auto-bind";
import { ConstructorProps, GetDeleteMethodProps, PostPutMethodProps } from "../Common/types";

interface RequestProps {
  options: object;
  fullResponse: boolean;
}



export default class ApiBase {
  axiosClient;

  constructor({ baseURL, commonHeaders, timeout = 4000 }: ConstructorProps) {
    this.axiosClient = axios.create({
      baseURL,
      timeout,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...commonHeaders,
      },
    });

    this.axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        // if (!error.response) {
        //   throw new Error("Unhandled Error happened...");
        // }

        // const { message } = error;
        // console.log(message, "this is an error");
        const errorData = error.response?.data;

        if (error.response) {
          const statusCode = error.response.status;
          switch (statusCode) {
            case 400:
              errorData.message = "Bad Request: " + errorData.message;
              break;
            case 401:
              errorData.message = "Unauthorized: " + errorData.message;
              break;
            case 403:
              errorData.message = "Forbidden: " + errorData.message;
              break;
            case 404:
              errorData.message = "Not Found: " + errorData.message;
              break;
            // Add more cases as needed
            default:
              errorData.message = "Unhandled Error: " + errorData.message;
          }
        } else {
          errorData.message = "Network Error: Unable to reach the server.";
        }

        // const codes = ["002", "003", "004"];
        // if (codes.includes(errorData.code)) {
        //   onAction && onAction();
        // }

        throw errorData;
      }
    );
    autoBind(this);
  }

  async request({ options, fullResponse }: RequestProps) {
    console.log(options);
    
    const response = await this.axiosClient.request(options);
    if (fullResponse) return fullResponse;
    return response?.data;
  }
  async get({
    url,
    params,
    fullResponse = false,
    others,
  }: GetDeleteMethodProps) {
    const options = {
      url,
      method: "get",
      params,
      ...others,
    };
    return this.request({ options, fullResponse });
  }

  async post({ url, data, fullResponse = false, others }: PostPutMethodProps) {
    const options = {
      url,
      method: "post",
      data,
      ...others,
    };
    return this.request({ options, fullResponse });
  }

  async put({ url, data, fullResponse = false, others }: PostPutMethodProps) {
    const options = {
      url,
      method: "put",
      data,
      ...others,
    };
    return this.request({ options, fullResponse });
  }

  async delete({
    url,
    params,
    fullResponse = false,
    others,
  }: GetDeleteMethodProps) {
    const options = {
      url,
      method: "delete",
      params,
      ...others,
    };
    return this.request({ options, fullResponse });
  }
}
