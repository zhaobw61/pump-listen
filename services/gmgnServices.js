import axiosInstance from './request.js';

// 获取热门币种
export const getHotCoinListService = async () => {
  try {
    const response = await axiosInstance.get(
      `https://gmgn.ai/defi/quotation/v1/rank/sol/swaps/5m?orderby=change5m&direction=desc&filters[]=renounced&filters[]=frozen&filters[]=burn&filters[]=distribed&min_insider_rate=0&max_insider_rate=0.05&max_created=3h`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('获取热门的币种失败  getGmgnCoinListService');
    return false;
  }
};

// 获取待开盘的币种
export const getProgressCoinListService = async () => {
  try {
    const response = await axiosInstance.get(
      `https://gmgn.ai/defi/quotation/v1/rank/sol/pump/1h?device_id=903d9bb5-6e81-441f-8e84-cdd57c5ed7dd&client_id=gmgn_web_2025.0212.174439&from_app=gmgn&app_ver=2025.0212.174439&tz_name=Asia%2FShanghai&tz_offset=28800&app_lang=en&limit=100&orderby=progress&direction=desc&pump=true&max_created=1h`
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('获取待开盘的币种失败  getGmgnCoinListService');
    return false;
  }
};

// 获取已开盘的数据
export const getOpenedCoinListService = async () => {
  try {
    const response = await axiosInstance.get(`https://gmgn.ai/defi/quotation/v1/pairs/sol/new_pairs/1h?device_id=feedca7e-128c-4240-b34d-0478d26d44ac&client_id=gmgn_web_2025.0213.185532&from_app=gmgn&app_ver=2025.0213.185532&tz_name=Asia%2FShanghai&tz_offset=28800&app_lang=en&limit=100&orderby=open_timestamp&direction=desc&launchpad=pump&period=1h&filters[]=not_honeypot&filters[]=pump`);
    const data = response.data;
    return data;
  } catch (error) {
    console.log('获取已开盘的币种失败  getGmgnCoinListService');
    return false;
  }
}