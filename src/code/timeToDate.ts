// Refs https://github.com/tinytot1/blog/issues/1

/**
 * @description js 显示友好的时间格式【刚刚（0-59s），几分钟前，几小时前，几天前（3天内），xxxx年xx月xx日xx时xx分xx秒 时间格式化】
 * @param time Date
 * @returns 刚刚（0-59s），几分钟前，几小时前，几天前（3天内），xxxx年xx月xx日xx时xx分xx秒
 */
function timeToDate(time: number | string): string {
  const nowTime = Math.trunc(new Date().getTime() / 1000);
  const date = new Date(time)
  const diffTime = nowTime - Math.trunc(date.getTime() / 1000);

  const m = 60;
  const h = m * 60;
  const d = h * 24;

  if (diffTime < 0) {
    return
  }
  if (diffTime >= 0 && diffTime < m) {
    return "刚刚"
  }
  if (diffTime / m < 60) {
    return Math.trunc(diffTime / m) + "分钟前";
  }
  if (diffTime / h < 24) {
    return Math.trunc(diffTime / h) + "小时前";
  }
  if (diffTime / d < 3) {
    return Math.trunc(diffTime / d) + "天前";
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
}

// console.log(timeToDate("2020-06-16 11:38:40"));
// console.log(timeToDate(new Date().getTime()));
// console.log(timeToDate("2020-06-15 12:38:40"));
// console.log(timeToDate("2020-06-14 12:38:40"));
// console.log(timeToDate("2020-06-13 12:38:40"));
// console.log(timeToDate("2020-06-12 12:38:40"));
// console.log(timeToDate("2020-04-16 11:38:40"));

// 扩展：方便添加显示效果
function timeToDate2(time: number | string) {
  const nowTime = Math.trunc(new Date().getTime() / 1000);
  const date = new Date(time)
  const diffTime = nowTime - Math.trunc(date.getTime() / 1000);

  if (diffTime < 0) {
    return
  }
  if (diffTime >= 0 && diffTime < 60) {
    return "刚刚"
  }
  const a = [
    {
      type: "min",
      value: 60,
      result: 60,
      title: "分钟前"
    },
    {
      type: "hour",
      value: 60 * 60,
      result: 24,
      title: "小时前"
    },
    {
      type: "day",
      value: 60 * 60 * 24,
      result: 7,
      title: "天前"
    },
    // {
    //   type: "week",
    //   value: 60 * 60 * 24 * 7,
    //   result: 5,
    //   title: "周前"
    // },
    {
      type: "mon",
      value: 60 * 60 * 24 * 30,
      result: 12,
      title: "月前"
    },
    // {
    //   type: "year",
    //   value: 60 * 60 * 24 * 30 * 12,
    //   result: Infinity,
    //   title: "年前"
    // }
  ]
  for (let i = 0, len = a.length; i < len; i++) {
    const item = a[i];
    if (diffTime / item.value < item.result) {
      return Math.trunc(diffTime / item.value) + item.title;
    }
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
}

console.log(timeToDate2("2020-06-16 11:38:40"));
console.log(timeToDate2(new Date().getTime()));
console.log(timeToDate2("2020-06-12 12:38:40"));
console.log(timeToDate2("2020-06-11 12:38:40"));
console.log(timeToDate2("2020-05-19 12:38:40"));
console.log(timeToDate2("2020-04-16 11:38:40"));
console.log(timeToDate2("2019-04-16 11:38:40"));


type Type = "sec" | "min" | "hour" | "day" | "week" | "mon" | "year";
// 扩展：可以设置xx时间之前显示时间效果
function timeToDate3(time: number | string, type: Type = "year", duration: number = 3) {
  const nowTime = Math.trunc(new Date().getTime() / 1000);
  const date = new Date(time)
  const diffTime = nowTime - Math.trunc(date.getTime() / 1000);

  if (diffTime < 0) {
    return
  }
  if (diffTime >= 0 && diffTime < 60) {
    return "刚刚"
  }
  const a = [
    {
      type: "min",
      value: 60,
      result: 60,
      title: "分钟前"
    },
    {
      type: "hour",
      value: 60 * 60,
      result: 24,
      title: "小时前"
    },
    {
      type: "day",
      value: 60 * 60 * 24,
      result: 7,
      title: "天前"
    },
    {
      type: "week",
      value: 60 * 60 * 24 * 7,
      result: 5,
      title: "周前"
    },
    {
      type: "mon",
      value: 60 * 60 * 24 * 30,
      result: 12,
      title: "月前"
    },
    {
      type: "year",
      value: 60 * 60 * 24 * 30 * 12,
      result: Infinity,
      title: "年前"
    }
  ]
  for (let i = 0, len = a.length; i < len; i++) {
    const item = a[i];
    if (item.type === type) {
      if (diffTime / item.value < item.result && diffTime / item.value < duration) {
        return Math.trunc(diffTime / item.value) + item.title;
      }
      break;
    }
    if (diffTime / item.value < item.result) {
      return Math.trunc(diffTime / item.value) + item.title;
    }
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`;
}

console.log(timeToDate3("2020-06-16 11:38:40"));
console.log(timeToDate3(new Date().getTime()));
console.log(timeToDate3("2020-06-12 12:38:40"));
console.log(timeToDate3("2020-06-11 12:38:40", "day", 3));
console.log(timeToDate3("2020-05-20 12:38:40", "week", 5));
console.log(timeToDate3("2020-04-19 11:38:40"));
console.log(timeToDate3("2019-04-16 11:38:40"));