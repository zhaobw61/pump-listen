import moment from 'moment';
import {
  checkScoreService,
  addScoreService,
  findScoreService,
} from '../services/twitterScoreServices.js';
import {
  filterTwitterLogService,
  updateTwitterLogService,
} from '../services/lastTwitterLogService.js';

import { sendMessage } from '../services/discordServices.js';

const findScore = async (userscreenName) => {
  let findRes = await findScoreService(userscreenName);
  console.log('findScore', userscreenName, findRes);
  if (findRes === null) {
    const scoreInfo = await checkScoreService(userscreenName);
    let score;
    scoreInfo === false ? (score = 0) : (score = scoreInfo.score);
    await addScoreService({
      twitterName: userscreenName,
      twitterScore: score,
    });
    return score;
  } else {
    return findRes.twitterScore;
  }
};

let updateScoreInter,
  updateScoreTime = 1000 * 10;
export const startUpdateScore = async () => {
  if (updateScoreInter) clearInterval(updateScoreInter);
  updateScoreInter = setInterval(async () => {
    console.log('startUpdateScore');
    const checkRes = await filterTwitterLogService({
      userScore: -1,
    });
    console.log('checkRes', checkRes.userscreenName);
    if (checkRes) {
      console.log('开始检查');
      let score = await findScore(checkRes.userscreenName);
      const dateTime = moment(Number(checkRes.time)).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      if (score > 100) {
        sendMessage({
          content: `合约地址 ${checkRes.address} 用户名 ${checkRes.userscreenName} 推特分数 ${score} 时间 ${dateTime}`,
          username: '警报狗',
        });
      }
      const updateRes = await updateTwitterLogService(checkRes.twitterId, {
        userScore: score,
      });
    }
  }, updateScoreTime);
};
