import { expect, test, describe } from '@jest/globals';

import { initialState as ingredientsState } from './slices/ingredients/ingridients';
import { initialState as feedsState } from '././slices/feed/feed';
import { initialState as cartBurgerState } from './slices/constructor/constructor';
import { initialState as userState } from './slices/user/user';
import { initialState as newOrderState } from './slices/order/order';
import { initialState as orderListState } from './slices/userOrders/userOrders';

import { rootReducer } from './rootReducer';

// Состояние для тестов корневого редюсера
const testState = {
  user: userState,
  ingredients: ingredientsState,
  constructorIngredient: cartBurgerState,
  newOrder: newOrderState,
  orders: orderListState,
  feeds: feedsState
};

// Тест корневого редюсера
describe('Проверка инициализации корневого редюсера', () => {
  test('', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
});
