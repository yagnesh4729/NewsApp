import { resilience } from './resilience';
import axiosFactory from 'axios';
import { NEWS_KEY } from '../utils/constants';
const axios = axiosFactory.create();
resilience(axios);

export const GET_DATA = async (url, callBack) => {
  axios
    .get(url, {
      headers: { "Authorization": NEWS_KEY },
    })
    .then(response => {
      console.log("response : ", response);
      let responseData = response.data;
      callBack(responseData);
    })
    .catch(err => {
      console.log("err : ", err);
      if (err?.response?.status == 401 || err?.response?.status == 400 || err?.response?.status == 426 || err?.response?.status == 429) {
        callBack(err?.response?.data.code);
      } else {
        callBack(new Error(err?.message));
      }
    });
};