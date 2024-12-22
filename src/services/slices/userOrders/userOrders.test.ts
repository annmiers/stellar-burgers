import { expect, test, describe } from '@jest/globals';

import { getUserOrders, initialState, userOrdersReducer } from './userOrders';

describe('Проверка слоя "userOrdersSlice"', () => {
  const ordersListData = [
    {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: '1',
      createdAt: '1',
      updatedAt: '1',
      number: 1
    },
    {
      _id: '2',
      ingredients: ['3', '4'],
      status: 'done',
      name: '2',
      createdAt: '2',
      updatedAt: '2',
      number: 2
    }
  ];

  test('Тестирование состояния запроса "fulfilled" для "userOrdersSlice"', () => {
    const fulfilled = {
      ...initialState,
      orders: ordersListData,
      isLoading: false
    };

    const action = {
      type: getUserOrders.fulfilled.type,
      payload: ordersListData
    };
    const newState = userOrdersReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
