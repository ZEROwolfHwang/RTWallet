package com.ltwallet.android_upgrade;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

/**
 * Created by Song on 2017/7/10.
 */
public class UpgradeModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext context;
    private static final String EVENT_NAME = "LOAD_PROGRESS";

    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "upgrade";
    }

    @ReactMethod
    public void upgrade(String apkUrl) {
        System.out.println(apkUrl);
        UpdateDialog.goToDownload(context, apkUrl);
    }


    public static void sendProgress(int msg) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(EVENT_NAME, msg);
    }

    @ReactMethod
    public void getApkName(Promise promise) {
        System.out.println(AppUtils.getVersionCode(context));

//        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//              .emit("APK_NAME", AppUtils.getVersionName(context));
        if (context == null) {
            promise.reject("Context doesn't exist");
            return;
        }

        try {
            String versionCode = AppUtils.getVersionName(context);

            promise.resolve(versionCode);


        } catch (Exception err) {

            promise.reject("从原生拿到版本号发生错误", err);
        }
    }


}
