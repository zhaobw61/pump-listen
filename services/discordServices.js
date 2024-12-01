import axiosInstance from './request.js';

const webhookUrl =
  'https://discord.com/api/webhooks/1312658505915961364/AhlVCohfZqhgT5wAddezOgfs5uD1Zh6CVMrwVm-yXt_KTp7hl4FuFRtSdKqFlTno9Swm'; // 替换为你的 Webhook URL

export const sendMessage = async (content) => {
  const res = axiosInstance.post(webhookUrl, content).catch((error) => {
    console.log('send dis message error');
  });
};

// const data = {
//   content: '你好啊，这么快就成功了',
//   username: '警报狗', // 可选，显示的用户名
// };
