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
  updateScoreTime = 1000 * 5;
export const startUpdateScore = async () => {
  if (updateScoreInter) clearInterval(updateScoreInter);
  updateScoreInter = setTimeout(async () => {
    const checkResList = await filterTwitterLogService({
      userScore: -1,
    });
    if (checkResList.length) {
      for (let i = 0; i < checkResList.length; i++) {
        let checkResItem = checkResList[i];
        let score = await findScore(checkResItem.userscreenName);
        let created_at = new Date(checkResItem.created_at);
        const dateTime = moment(created_at).format('YYYY-MM-DD HH:mm:ss');
        if (score > 100) {
          sendMessage({
            content: `合约地址 ${checkResItem.address} 用户名 ${checkResItem.userscreenName} 推特分数 ${score} 时间 ${dateTime}`,
            username: '警报狗',
          });
        }
        await updateTwitterLogService(checkResItem.twitterId, {
          userScore: score,
        });
      }
    }
  }, updateScoreTime);
};
