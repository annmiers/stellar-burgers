import { expect, test, describe } from '@jest/globals';

import { initialState as constructorState } from './slices/constructor/constructor';
import { initialState as feedsState } from '././slices/feed/feed';
import { initialState as ingredientsState } from './slices/ingridients/ingridients';
import { initialState as orderState } from './slices/order/order';
import { initialState as userState } from './slices/user/user';
import { initialState as userOrdersState } from './slices/userOrder/userOrders';

import { rootReducer } from './rootReducer';

const testState = {
  constructorIngredient: constructorState,
  feeds: feedsState,
  ingredients: ingredientsState,
  newOrder: orderState,
  user: userState,
  orders: userOrdersState
};

describe('Проверка инициализации rootReducer', () => {
  test('', () => {
    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toStrictEqual(
      testState
    );
  });
});
