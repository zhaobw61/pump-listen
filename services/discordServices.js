import axiosInstance from './request.js';

const webhookUrl =
  'https://discord.com/api/webhooks/1308369164083400776/Buzf3FayInli31y6Wb5GeGXFHow3L8W56bVh7XKYLlm_ZjkKHNBFNCJ3pInbEcYkN2sk'; // 替换为你的 Webhook URL

export const sendMessage = async (content) => {
  const res = axiosInstance.post(webhookUrl, content).catch((error) => {
    console.log('send dis message error');
  });
};

// const data = {
//   content: '你好啊，这么快就成功了',
//   username: '警报狗', // 可选，显示的用户名
// };
