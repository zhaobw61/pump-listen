console.log(new Date());

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
