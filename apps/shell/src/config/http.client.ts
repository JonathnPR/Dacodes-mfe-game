import { message } from "antd";
import axios from "axios";
import debounce from "debounce";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_EXT_DATA_API,
});

const messageError = debounce((msg) => message.error(msg, 5), 500);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorMessage = error?.response?.data?.message;

    if (error?.code === "ERR_NETWORK") {
      messageError("No connection to the server");
    }

    if ([401].includes(error.status)) {
      messageError(
        errorMessage === "Unauthorized"
          ? "Session expired, please log in again"
          : errorMessage
      );
    }

    if ([400, 404, 422, 500].includes(error.status)) {
      messageError(errorMessage || "Server error");
    }

    return Promise.reject(error);
  }
);

const sessionToken = localStorage.getItem("token") as string;

export const setToken = (token: string, isFirstTime = false) => {
  const tokenInLocalStorage = localStorage.getItem("token");

  if (!tokenInLocalStorage && !isFirstTime) {
    localStorage.setItem("token", token);
  }

  httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

setToken(sessionToken, true);

export default httpClient;
