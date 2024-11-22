import axiosInstance from './request.js';
import twitterScore from '../models/twitterScoreModels.js';

// 添加新的分数
export const addScoreService = async (params) => {
  const scoreRes = await twitterScore.findOne({
    twitterName: params.twitterName,
  });
  if (scoreRes == null) {
    let res = await new twitterScore(params).save();
    return res;
  }
};

// 修改分数
export const updateScoreService = async (name, score) => {
  const scoreRes = await twitterScore.updateOne(
    {
      twitterName: name,
    },
    { $set: { twitterScore: score } }
  );
  return scoreRes;
};

// 查询分数
export const findScoreService = async (name) => {
  const scoreRes = await twitterScore.findOne({
    twitterName: name,
  });
  return scoreRes;
};

// 删除记录
export const deleteScoreService = async (name) => {
  const res = await twitterScore.findOneAndDelete({ twitterName: name });
  return res;
};

// 向平台获取推特分数
export const checkScoreService = async (name) => {
  console.log('https://api.tweetscout.io/api/score/' + name);
  try {
    const res = await axiosInstance.get(
      `https://api.tweetscout.io/api/score/${name}`,
      {
        headers: {
          ApiKey: '576b0cff-3a2f-4726-a135-af83fd023581',
        },
      }
    );
    const data = res.data;
    return data;
  } catch (error) {
    console.log('获取分数出错');
    return false;
  }
};
