// console.log(new Date(1733154089344));

// const now = new Date();
// const year = now.getFullYear();
// const month = now.getMonth() + 1;
// const date = now.getDate();
// const hours = now.getHours();
// const minutes = now.getMinutes();
// const seconds = now.getSeconds();

// console.log(
//   `当前时间：${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`
// );

// // const now1 = new Date('1733154089344');

// console.log(now.getTime()); // 本地时区时间
// console.log(now.toISOString()); // UTC 时间
// console.log(now.toUTCString()); // 等同于 UTC 时间

// const now2 = new Date(1733154169736);
// console.log(now2.toString()); // 返回带本地时区信息的时间
function getUtcTimeDifferenceInMinutes(now, previousUtcTime) {
  const previous = new Date(previousUtcTime); // 将之前的 UTC 时间字符串解析为 Date 对象
  console.log(now.getTime());

  // 计算时间差（毫秒）
  const differenceMs = now.getTime() - previous.getTime();

  // 转换为分钟
  const differenceMinutes = Math.floor(differenceMs / (1000 * 60));

  return differenceMinutes;
}

let res = getUtcTimeDifferenceInMinutes(
  new Date(),
  'Tue Dec 03 08:40:56 +0000 2024'
);
console.log(res);
console.log(new Date(1733215256000).getHours());

const now = new Date();
console.log('本地时间:', now.toString());
console.log('UTC 时间:', now.toUTCString());
console.log('毫秒时间戳:', now.getTime());
