import axios from "axios";

import i18n from "../i18n/i18n";


const axiosInterceptor = {
  initialise: () => {
    axios.defaults.timeout = 100000;
    axios.defaults.timeoutErrorMessage =
      "Server is not reachable. Please try later.";
    
    // Request Interceptor. All Request pass from here
    axios.interceptors.request.use(async (axiosConfig) => {
      axiosConfig.baseURL = process.env.REACT_APP_API_URL + `${i18n.language ?? "en"}`;;
      
      return axiosConfig;
    });

  

  },
};

export default axiosInterceptor;
