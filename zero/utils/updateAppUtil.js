import ToastUtil from "./ToastUtil";
import {fetchRequest} from "./FetchUtil";
import {Alert} from "react-native";
import {updateApp} from "../containers/global/AllModuleUtils";
import {Api} from "./Api";
/**
 * Created by zerowolf Date: 2018/6/16 Time: 上午12:15
 */
const updateAppByLogin =()=> fetchRequest(Api.updateApp, 'GET')
    .then(res => {
        console.log(res);
        if (res.respCode === 200) {
            let updateInfo = res.data;
            let netVersion = parseFloat(updateInfo.version);
            console.log(netVersion);

            updateApp.getApkName()
                .then(localVersion => {
                    console.log(localVersion);

                    if (parseFloat(localVersion) < netVersion) {

                        Alert.alert(
                            `版本升级:${netVersion}`,
                            `${updateInfo.content}`,
                            [
                                updateInfo.isupdate === 0 ? {
                                    text: '取消',
                                    onPress: () => console.log('Ask me later pressed')
                                } : null,
                                {
                                    text: '确定', onPress: () => {
                                        // this.pressSureButton(updateInfo.fileUrl)
                                        updateApp.upgrade(updateInfo.fileUrl);
                                    }, style: 'cancel'
                                },

                            ],
                            {cancelable: false}
                        );
                    } else {
                        console.log('当前已是最新版本,无需更新');
                    }

                })

        }else {
            ToastUtil.showShort(res.respMsg)
        }
    }).catch(err => {
        console.log(err);
    });
export {
    updateAppByLogin
};
