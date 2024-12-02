console.log(new Date(1733154089344));

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();

console.log(
  `当前时间：${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`
);

// const now1 = new Date('1733154089344');

console.log(now.getTime()); // 本地时区时间
console.log(now.toISOString()); // UTC 时间
console.log(now.toUTCString()); // 等同于 UTC 时间

const now2 = new Date(1733154169736);
console.log(now2.toString()); // 返回带本地时区信息的时间
