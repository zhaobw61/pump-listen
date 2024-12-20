import moment from 'moment';
import {
  addTwitterLogService,
  filterTwitterLogService,
} from '../services/lastTwitterLogService.js';
import { getAllHotCoinService } from '../services/hotCoinServices.js';
import { getAllProgressCoinService } from '../services/progressCoinServices.js';
import { getLastSearchServices } from '../services/twitterApiServices.js';

import {
  checkScoreService,
  addScoreService,
  findScoreService,
} from '../services/twitterScoreServices.js';

import { sendMessage } from '../services/discordServices.js';

let messageNoticTime = {};

// 查询分数
const findScore = async (userscreenName) => {
  let findRes = await findScoreService(userscreenName);
  if (findRes === null) {
    const scoreInfo = await checkScoreService(userscreenName);
    if (scoreInfo === false) {
      return false;
    }
    await addScoreService({
      twitterName: userscreenName,
      twitterScore: scoreInfo.score,
    });
    return scoreInfo.score;
  } else {
    return findRes.twitterScore;
  }
};

function getUtcTimeDifferenceInMinutes(now, previousUtcTime) {
  const previous = new Date(previousUtcTime); // 将之前的 UTC 时间字符串解析为 Date 对象

  // 计算时间差（毫秒）
  const differenceMs = now.getTime() - previous.getTime();

  // 转换为分钟
  const differenceMinutes = Math.floor(differenceMs / (1000 * 60));

  return differenceMinutes;
}

// 检查一分钟内发推数量
const checknInMinutesNum = (list, searchContent, cointType, coinItem) => {
  let oneMinutePeopleList = new Set();
  const now = new Date(); // 获取当前时间
  if (messageNoticTime[searchContent]) {
    if (
      getUtcTimeDifferenceInMinutes(now, messageNoticTime[searchContent]) < 1
    ) {
      return;
    }
  }
  for (let i = 0; i < list.length; i++) {
    if (getUtcTimeDifferenceInMinutes(now, list[i].created_at) > 1) {
      break;
    }
    oneMinutePeopleList.add(list[i].screen_name);
  }
  if (oneMinutePeopleList.size >= 5) {
    messageNoticTime[searchContent] = new Date();
    if (cointType == 'HOT') {
      sendMessage({
        content: `
        排行榜
        币名字 ${coinItem.symbol}
        合约地址 ${searchContent}
        人数 ${oneMinutePeopleList.size}
        gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
        推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
      `,
        username: '人数-警报',
      });
    } else if (cointType == 'PROGRESS') {
      sendMessage({
        content: `
        内转外
        币名字 ${coinItem.symbol}
        合约地址 ${searchContent}
        人数 ${oneMinutePeopleList.size}
        gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
        推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
        `,
        username: '人数-警报',
      });
    }
  }
};

// 添加新的推特记录
const addTwitterLog = async (list, searchContent, cointType, coinItem) => {
  checknInMinutesNum(list, searchContent, cointType, coinItem);
  const now = new Date(); // 获取当前时间
  for (let i = 0; i < list.length; i++) {
    // 时间不能超过2分钟
    if (getUtcTimeDifferenceInMinutes(now, list[i].created_at) > 2) {
      break;
    }
    const findRes = await filterTwitterLogService({
      tweet_id: list[i].tweet_id,
    });
    if (findRes) {
      break;
    }
    let twitterScore = await findScore(list[i].screen_name);
    if (twitterScore == false) continue;

    if (twitterScore > 500) {
      const createdAtTime = moment(list[i].created_at).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      if (cointType == 'HOT') {
        sendMessage({
          content: `
          排行榜
          币名字 ${coinItem.symbol}
          合约地址 ${searchContent}
          用户名 ${list[i].screen_name}
          推特分数 ${twitterScore}
          推特创建时间 ${createdAtTime}
          gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
          推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
          `,
          username: '排行榜-警报',
        });
      } else if (cointType == 'PROGRESS') {
        sendMessage({
          content: `
          内转外
          币名字 ${coinItem.symbol}
          合约地址 ${searchContent}
          用户名 ${list[i].screen_name}
          推特分数 ${twitterScore}
          推特创建时间 ${createdAtTime}
          gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
          推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
          `,
          username: '内转外-警报',
        });
      }
    }
    addTwitterLogService({
      address: searchContent,
      tweet_id: list[i].tweet_id,
      user_id: list[i].user_id,
      text: list[i].text,
      created_at: list[i].created_at,
      screen_name: list[i].screen_name,
      twitterScore: twitterScore,
      cointType: cointType,
    });
  }
};

// 监听热门币种
const listenHotCoin = async () => {
  let index = 0;
  setInterval(async () => {
    console.log('hot heart', new Date());
    const hotCoinList = await getAllHotCoinService();
    if (hotCoinList.length == 0) return;
    if (index > hotCoinList.length - 1) {
      index = 0;
    }
    let item = hotCoinList[index];
    let twitterSearchList;
    try {
      twitterSearchList = await getLastSearchServices(item.address);
    } catch (error) {
      console.log('hotCoinList', hotCoinList);
      console.log('index', index);
      console.log('item', item);
    }

    if (twitterSearchList.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'HOT', item);
    }
    index++;
  }, 1000);
};

// 监听即将打满币种
const listenProgressCoin = async () => {
  let index = 0;
  setInterval(async () => {
    console.log('Progress heart', new Date());
    const progressCoinList = await getAllProgressCoinService();
    if (progressCoinList.length == 0) return;
    if (index > progressCoinList.length - 1) {
      index = 0;
    }
    let item = progressCoinList[index];
    let twitterSearchList;
    try {
      twitterSearchList = await getLastSearchServices(item.address);
    } catch (error) {
      console.log('progressCoinList', progressCoinList);
      console.log('index', index);
      console.log('item', item);
    }

    if (twitterSearchList.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'PROGRESS', item);
    }
    index++;
  }, 1000);
};

// 更新热门推特记录
export const startListenTwitterLog = async () => {
  listenHotCoin(); // 监听热门币种
  listenProgressCoin(); // 监听即将打满币种
};
