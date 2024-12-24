import { expect, test, describe } from '@jest/globals';
import { getUserOrders, initialState, userOrdersReducer } from './userOrders';

const userOrdersMock = {
  orders: [
    {
      _id: '676ae8a6750864001d374413',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный бургер',
      createdAt: '2024-12-24T17:00:22.812Z',
      updatedAt: '2024-12-24T17:00:25.304Z',
      number: 64086
    },
    {
      _id: '676ae859750864001d3743fe',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-12-24T16:59:05.411Z',
      updatedAt: '2024-12-24T16:59:06.329Z',
      number: 64085
    }
  ]
};

describe('Тестирование запроса getUserOrders', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: userOrdersMock
    };
    const state = userOrdersReducer(initialState, action);

    expect(state.orders).toEqual(userOrdersMock);
    expect(state.isLoading).toBe(false);
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = userOrdersReducer(initialState, {
      type: getUserOrders.pending.type
    });

    expect(state.isLoading).toBe(true);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const state = userOrdersReducer(initialState, {
      type: getUserOrders.rejected.type
    });

    expect(state.isLoading).toBe(false);
  });
});
