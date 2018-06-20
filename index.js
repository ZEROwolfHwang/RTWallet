import { AppRegistry } from 'react-native';

//    "react-navigation": "^1.0.0-beta.21",
//    "realm": "^2.0.13",

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader','Module RCTWeChat']);

YellowBox.ignoreWarnings(['Class RCTCxxModule']);


console.ignoredYellowBox = ['Remote debugger'];
import App from './App';
// import App from './zwtest/PickerTest';
// import App from './zwtest/AppState';
// import App from './zwtest/SetPassword';
// import App from './zwtest/KeyboardTest';
// import App from './share/components/Home';
// import App from './Test';a




AppRegistry.registerComponent('LTWallet', () => App);
