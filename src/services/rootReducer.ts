import { combineReducers } from 'redux';

import {
  ingredientsReducer,
  ingredientsSlice
} from './slices/ingridients/ingridients';
import {
  constructorReducer,
  constructorSlice
} from './slices/constructor/constructor';
import { userReducer, userSlice } from './slices/user/user';
import { feedsReducer, feedsSlice } from './slices/feed/feed';
import { createOrderReducer, createOrderSlice } from './slices/order/order';
import {
  userOrdersReducer,
  userOrdersSlice
} from './slices/userOrder/userOrders';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsReducer,
  [constructorSlice.name]: constructorReducer,
  [userSlice.name]: userReducer,
  [feedsSlice.name]: feedsReducer,
  [createOrderSlice.name]: createOrderReducer,
  [userOrdersSlice.name]: userOrdersReducer
});
