/**
 * Created by zerowolf on 2018/4/8.
 */
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const storage1 = new Storage({
    // maximum capacity, default 1000
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
    sync: {}
});

global.storage = storage1
// export default storage;
