/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
// 新建表模型
class CardSchema extends Realm.Object{}
CardSchema.schema = {
    name: 'Card',
    properties: {
        card_name: 'string',
        number_id: 'string',
        number_credit_card:{type: 'int', default: 0},
        number_phone: {type: 'int', default: 0},
        card_validity: {type: 'int', default: 0},
        card_cvn2: {type: 'int', default: 0},
        card_data_repay: {type: 'int', default: 0},
        card_data_bill: {type: 'int', default: 0},
    }
};
export default new Realm({schema: [CardSchema]});
