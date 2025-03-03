import moment from 'moment';
import {
  addTwitterLogService,
  filterTwitterLogService,
} from '../services/lastTwitterLogService.js';
import { getAllHotCoinService } from '../services/hotCoinServices.js';
import {
  getAllProgressCoinService,
  addTwitterUserInfoToOpenedCoinService,
} from '../services/progressCoinServices.js';
import { getAllOpenedCoinService } from '../services/openedCoinServices.js';
import { getLastSearchServices } from '../services/twitterApiServices.js';

import { sendMessage } from '../services/discordServices.js';

let messageNoticTime = {};

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
    if (cointType == 'OPEND') {
      sendMessage({
        content: `
        排行榜
        币名字 ${coinItem.symbol}
        合约地址 ${searchContent}
        人数 ${oneMinutePeopleList.size}
        gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
        推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
      `,
        username: '已开盘-一分钟推特数量-警报',
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
        username: '即将开盘-一分钟推特数量-警报',
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
    const createdAtTime = moment(list[i].created_at).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    if (cointType == 'OPEND') {
      sendMessage({
        content: `
        币名字 ${coinItem.symbol}
        合约地址 ${searchContent}
        用户名 ${list[i].screen_name}
        推特创建时间 ${createdAtTime}
        gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
        推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
        `,
        username: '已开盘-有新的推特-警报',
      });
    } else if (cointType == 'PROGRESS') {
      sendMessage({
        content: `
        内转外
        币名字 ${coinItem.symbol}
        合约地址 ${searchContent}
        用户名 ${list[i].screen_name}
        推特创建时间 ${createdAtTime}
        gmgn购买链接 https://gmgn.ai/sol/token/bQVth3du_${searchContent}
        推特最新搜索链接 https://x.com/search?q=${searchContent}&src=typed_query&f=live
        `,
        username: '即将开盘-有新的推特-警报',
      });
    }
    addTwitterLogService({
      address: searchContent,
      tweet_id: list[i].tweet_id,
      user_id: list[i].user_id,
      text: list[i].text,
      created_at: list[i].created_at,
      screen_name: list[i].screen_name,
      cointType: cointType,
    });
  }
};

// 给即将开盘的代币添加推特用户信息
const addTwitterUserInfoToOpenedCoin = async (list, address) => {
  let oldestTwitter = list[list.length - 1];
  let accountCreateDays =
    (new Date().getTime() -
      new Date(oldestTwitter.account_created_at).getTime()) /
    1000 /
    60 /
    60 /
    24;
  let account_score =
    accountCreateDays * 0.2 +
    oldestTwitter.account_favourites_count * 0.1 +
    oldestTwitter.account_followers_count * 0.3 +
    oldestTwitter.account_friends_count * 0.2 +
    oldestTwitter.account_media_count * 0.2;
  addTwitterUserInfoToOpenedCoinService({
    address: address,
    screen_name: oldestTwitter.screen_name,
    account_created_at: oldestTwitter.account_created_at,
    account_favourites_count: oldestTwitter.account_favourites_count,
    account_followers_count: oldestTwitter.account_followers_count,
    account_friends_count: oldestTwitter.account_friends_count,
    account_media_count: oldestTwitter.account_media_count,
    account_score: account_score,
  });
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

    if (twitterSearchList?.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'PROGRESS', item);
    }
    if (!item.screen_name && twitterSearchList?.tweets) {
      addTwitterUserInfoToOpenedCoin(twitterSearchList.tweets, item.address);
    }
    index++;
  }, 1000);
};

// 监听已开盘币种
const listenOpenedCoin = async () => {
  let index = 0;
  setInterval(async () => {
    console.log('opened heart', new Date());
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

    if (twitterSearchList?.tweets) {
      addTwitterLog(twitterSearchList.tweets, item.address, 'OPEND', item);
    }
    index++;
  }, 1000);
};

// 给即将打满的代币添加推特的信息
const addTwitterAccountInofToProgressCoin = () => {
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
    if (item.screen_name) return;
    try {
      twitterSearchList = await getLastSearchServices(item.address);
    } catch (error) {
      console.log('progressCoinList', progressCoinList);
      console.log('index', index);
      console.log('item', item);
    }
    if (!item.screen_name && twitterSearchList?.tweets) {
      addTwitterUserInfoToOpenedCoin(twitterSearchList.tweets, item.address);
    }
    index++;
  }, 1000);
};

// 更新热门推特记录
export const startListenTwitterLog = async () => {
  listenProgressCoin(); // 监听即将打满币种
  listenOpenedCoin(); // 监听已开盘币种
  addTwitterAccountInofToProgressCoin(); // 给即将打满的代币添加推特的信息
};
