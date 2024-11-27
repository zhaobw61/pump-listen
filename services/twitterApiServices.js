import axiosInstance from './request.js';

// 查询推特的搜索
export const getLastSearchServices = async (content) => {
  try {
    const response = await axiosInstance.get(
      `https://api.apidance.pro/sapi/Search?q=${content}&cursor&sort_by=Latest`,
      {
        headers: {
          apikey: 'gx8oca02jom03zrtf0ef5ign86ahdi',
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    return {};
  }
};

// 查询API剩余的次数
export const getApiCount = async () => {
  try {
    const response = await axiosInstance.get(
      `https://api.apidance.pro/key/gx8oca02jom03zrtf0ef5ign86ahdi`
    );
    const data = response.data;
    return data;
  } catch (error) {
    return false;
  }
};
