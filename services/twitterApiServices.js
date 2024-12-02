import axiosInstance from './request.js';

// 查询推特的搜索
export const getLastSearchServices = async (content) => {
  try {
    const response = await axiosInstance.get(
      `https://twitter.good6.top/api/base/apitools/search?any=${content}&apiKey=1547220975078735873OGMweEFHRUFIUzJNEkycG54ZW54SEp&product=Latest`
    );
    const searchList = JSON.parse(response.data.data);
    const oriList =
      searchList.data.search_by_raw_query.search_timeline.timeline
        .instructions[0].entries;
    let list = { tweets: [] };
    if (oriList && oriList.length) {
      oriList.forEach((item) => {
        const entryType = item.content.entryType;
        if (entryType == 'TimelineTimelineItem') {
          const legacy = item.content.itemContent.tweet_results.result.legacy;
          const user_results =
            item.content.itemContent.tweet_results.result.core.user_results;
          list.tweets.push({
            tweet_id: legacy.id_str,
            user_id: user_results.result.rest_id,
            text: legacy.full_text,
            created_at: legacy.created_at,
            screen_name: user_results.result.legacy.screen_name,
          });
        }
      });
    }
    return list;
  } catch (error) {
    console.log('推特搜索失败');
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
