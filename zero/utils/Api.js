/**
 * Created by zerowolf Date: 2018/6/12 Time: 下午10:49
 */


// export const updateApp = 'version?appType=0';

export const Api = {
    //注册
    Register: 'Register',      //注册



    enchashment: 'enchashment',      //拿到书卡支付的界面内容
    checkRecommend: 'checkRecommend',      //判断邀请码是否合理
    detail: 'detail',      //拿到书卡支付的界面详情
    updateApp: 'version?appType=0',     //升级


    //完美还款
    repayments: 'repayments',            //计划任务列表
    createPlan: 'createPlan',             //添加计划任务
    planInfo: 'planInfo',                //查看计划任务
    editCard: 'editCard',                //修改卡信息
    stopPlan: 'stopPlan',                //暂停计划
    startPlan: 'startPlan',                //恢复计划
    cancelPlan: 'cancelPlan',                //取消计划
    planSingleInfo: 'planSingleInfo',                //获取单条记录[最新一条]
    planHistory: 'planHistory'                //历史计划


};
