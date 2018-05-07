/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import {UserSchema} from "./schema_user";
import {CardSchema} from "./schema_card";


export default new Realm({
    schemaVersion: 9,
    schema: [UserSchema, CardSchema],
    // path:'/Users/zerowolf/Desktop/realmDB/myModel.realm',
});

