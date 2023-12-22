import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:88", // api 的 base_url
  // timeout: 60000, // 請求超時設置
});

// 請求攔截器
request.interceptors.request.use(
  (config: any = {}) => {
    //! 有取得就加到 header
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }

    return config;
  },
  (error) => {
    //! 處理請求錯誤
    return Promise.reject(error);
  }
);

//! 響應攔截器
request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const postRequest = function (
  url: string,
  params: any,
  config: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .post(url, params, Object.assign({}, config))
      .then(
        (response: any) => {
          resolve(response.data);
        },
        (err: any) => {
          if (err.Cancel) {
            console.log(err);
          } else {
            reject(err);
          }
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
};

const getRequest = function (url: string, params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    request
      .get(url, params)
      .then(
        (response: any) => {
          resolve(response.data);
        },
        (err: any) => {
          if (err.Cancel) {
            console.log(err);
          } else {
            reject(err);
          }
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
};

const post = (url: string, params = {}, config = {}): Promise<any> => {
  return postRequest(url, params, config);
};

const get = (url: string, params = {}, config = {}): Promise<any> => {
  return getRequest(url, params);
};

export { post, get };
