import { sendMessage } from './services/discordServices.js';

for (let i = 0; i < 10; i++) {
  try {
    sendMessage({
      content: '这是一个测试消息' + '---' + i,
      username: '警报机器人',
    });
  } catch (error) {
    console.log(i);
  }
}
