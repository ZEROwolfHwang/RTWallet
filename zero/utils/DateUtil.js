/**
 * 根据还款日,拿到提醒还款日
 * @param repayDate
 */
const remindRepayDay = (repayDate: string) => {


    var today = new Date();//获得当前日期

    //还款日期小于当前日期则返回下个月

    var month = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份

    // console.log('repayDate: ', repayDate);


    // console.log('today: ',today.getMonth());

    // console.log('parseInt(repayDate): ',parseInt(repayDate));


    // console.log('today: ',today.getDate());


    if (parseInt(repayDate) < today.getDate()) {
        // month = month + 1;
        if (month === 12) {
            month = 1;
        } else {
            month = month + 1;
        }
    }

    if (month < 10) {
        return `0${month.toString()}/${repayDate}`;
    } else {
        return `${month.toString()}/${repayDate}`;
    }

}

const getDateTimeDiff = (repayDate: string) => {
    var retValue = {};

    const startTime = new Date();

    let endTime = new Date();


    // console.log('curTime: ', endTime);


    // endTime.setMonth(11);

    endTime.setDate(parseInt(repayDate));

    if (parseInt(repayDate) < startTime.getDate()) {
        endTime.setMonth(endTime.getMonth() + 1);
    }

    // console.log('startTime: ', startTime);


    // console.log('endTime: ', endTime);


    // console.log('endTime: ', endTime.getMonth());
    // console.log('endTime: ', endTime.getFullYear());


    var date3 = Math.abs(endTime.getTime() - startTime.getTime());  //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000));
    retValue.Days = days;

    var years = Math.floor(days / 365);
    retValue.Years = years;

    var months = Math.floor(days / 30);
    retValue.Months = months;

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    retValue.Hours = hours;

    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    retValue.Minutes = minutes;

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    retValue.Seconds = seconds;

    var strTime = "";
    if (years >= 1) {
        strTime = years + "年前";
    } else if (months >= 1) {
        strTime = months + "个月前";
    } else if (days >= 1) {
        strTime = days + "天前";
    } else if (hours >= 1) {
        strTime = hours + "小时前";
    } else {
        strTime = minutes + "分钟前";
    }
    retValue.PubTime = strTime;     //帖子,文章,博客发表时间的一种简短表示方法

    // console.log('retValue: ', retValue);

    return days;

}

export {
    remindRepayDay,
    getDateTimeDiff
}
