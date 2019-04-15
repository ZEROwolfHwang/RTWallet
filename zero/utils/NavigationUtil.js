/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { NavigationActions } from 'react-navigation';
import {actions} from "../root/GlobalAction";
import {actions_wealth} from "../containers/wealth/reduce";

const reset = (navigation, routeName) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  navigation.dispatch(resetAction);
};



const backToLogin = (navigation) => {

    navigation.dispatch(actions.getGlobalInfo(undefined));
    navigation.dispatch(actions_wealth.fetchData(undefined));

    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'RegisterApp'})],
    });
    navigation.dispatch(resetAction);
};

export default {
  reset,
    backToLogin

};
