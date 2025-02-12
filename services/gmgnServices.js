import axiosInstance from './request.js';

// 获取热门币种
export const getHotCoinListService = async () => {
  try {
    const response = await axiosInstance.get(
      `https://gmgn.ai/defi/quotation/v1/rank/sol/pump/1h?device_id=903d9bb5-6e81-441f-8e84-cdd57c5ed7dd&client_id=gmgn_web_2025.0212.174439&from_app=gmgn&app_ver=2025.0212.174439&tz_name=Asia%2FShanghai&tz_offset=28800&app_lang=en&limit=100&orderby=progress&direction=desc&pump=true&max_created=1h`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('获取热门币种失败  getHotCoinListService');
    return false;
  }
};

// 获取待开盘的币种
export const getProgressCoinListService = async () => {
  try {
    const response = await axiosInstance.get(
      `https://gmgn.ai/defi/quotation/v1/rank/sol/pump/1h?limit=3&orderby=progress&direction=desc&pump=true`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('获取待开盘的币种失败  getGmgnCoinListService');
    return false;
  }
};
