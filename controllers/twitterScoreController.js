import {
  checkScoreService,
  addScoreService,
  findScoreService,
} from '../services/twitterScoreServices.js';
import {
  filterTwitterLogService,
  updateTwitterLogService,
} from '../services/twitterLogService.js';

const saveScore = async (twitterName) => {
  let findRes = await findScoreService(twitterName);
  console.log(twitterName, findRes);
  if (findRes === null) {
    const scoreInfo = await checkScoreService(twitterName);
    let score;
    scoreInfo === false ? (score = 0) : (score = scoreInfo.score);
    await addScoreService({
      twitterName: twitterName,
      twitterScore: score,
    });
  }
};

let updateScoreInter,
  updateScoreTime = 1000 * 30;
export const startUpdateScore = async () => {
  if (updateScoreInter) clearInterval(updateScoreInter);
  updateScoreInter = setInterval(async () => {
    console.log('startUpdateScore');
    const checkRes = await filterTwitterLogService({
      checkNewTwitterStatus: false,
    });
    if (checkRes) {
      await saveScore(checkRes.twitterAccountName);
      if (checkRes.logInfo.lastTweetList) {
        checkRes.logInfo.lastTweetList.forEach(async (item) => {
          await saveScore(item.userscreenName);
        });
      }

      if (checkRes.logInfo.topTweetList) {
        checkRes.logInfo.topTweetList.forEach(async (item) => {
          await saveScore(item.userscreenName);
        });
      }
      await updateTwitterLogService(checkRes.address, {
        checkNewTwitterStatus: true,
      });
    }
  }, updateScoreTime);
};
