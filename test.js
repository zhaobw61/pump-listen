import { sendMessage } from './services/discordServices.js';
const data = {
  content: '你好啊，这么快就成功了',
  username: '警报狗', // 可选，显示的用户名
};
sendMessage(data);
