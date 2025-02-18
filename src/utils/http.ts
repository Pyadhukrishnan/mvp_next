import Axios, { AxiosRequestConfig } from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const axioClient = Axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: false,
});

// Attach Authorization token dynamically before each request
axioClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No access token found!");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = () => {
  /**
   * HTTP POST method for API request
   * @param url - API endpoint path
   * @param props - Request data
   * @param hasFile - Flag for file upload
   * @param requireAuth - Whether Authorization header is needed (default: true)
   * @returns Response data
   */
  const post = async (
    url: string,
    props?: JSON | FormData,
    hasFile?: boolean,
    requireAuth: boolean = true // Default to true
  ) => {
    const fullUrl = `${backendUrl}${url}`;
    
    let config: AxiosRequestConfig = {
      headers: {
        "Content-Type": hasFile ? "multipart/form-data" : "application/json",
      },
    };

    // Remove Authorization header if authentication is not required
    if (!requireAuth) {
      delete config.headers!.Authorization;
    }

    try {
      const response = await axioClient.post(fullUrl, props, config);
      
      // Handle empty response
      if (!response.data) {
        return {
          response,
          body: {
            status: false,
            message: "server error [001]",
          },
        };
      }

      return { response, body: response.data };
    } catch (error: any) {
      if (error.response) {
        return {
          response: error.response,
          body: {
            status: false,
            message: error.response.data?.message || "An error occurred",
            errors: error.response.data?.errors,
          },
        };
      }

      return {
        data: {
          status: false,
          message: "server error [100]",
        },
      };
    }
  };

  return { post };
};

export default http;
