const webhookUrl =
  'https://discord.com/api/webhooks/1308369183234461716/fiIn3NO0oa0NXJwTMPpsAKlSsRBhRfO3jwySRL8dovV4UMAMK10GbtQlZlYAv7nPCvQn'; // 替换为你的 Webhook URL

import axios from 'axios';
const axiosInstance = axios.create({
  proxy: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '7890',
  },
});

const data = {
  content: '你好啊，这么快就成功了',
  username: '土狗抓手', // 可选，显示的用户名
};

axiosInstance
  .post(webhookUrl, data)
  .then((response) => {
    console.log('消息发送成功:', response.data);
  })
  .catch((error) => {
    console.error(
      '消息发送失败:',
      error.response ? error.response.data : error.message
    );
  });
