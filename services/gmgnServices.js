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
