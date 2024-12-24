import { expect, test, describe } from '@jest/globals';
import { feedsReducer, getAllFeeds, initialState } from './feed';

const ordersMock = {
  orders: [
    {
      _id: '676b1dd9750864001d3745f7',
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093c'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-12-24T20:47:21.238Z',
      updatedAt: '2024-12-24T20:47:22.736Z',
      number: 64120
    },
    {
      _id: '676b1da0750864001d3745f5',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-12-24T20:46:24.486Z',
      updatedAt: '2024-12-24T20:46:25.444Z',
      number: 64119
    }
  ],
  total: 2,
  totalToday: 2
};

describe('Тестирование запроса getAllFeeds', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: ordersMock
    };
    const state = feedsReducer(initialState, action);

    expect(state.orders).toEqual(ordersMock.orders);
    expect(state.total).toBe(ordersMock.total);
    expect(state.totalToday).toBe(ordersMock.totalToday);
    expect(state.isLoading).toBe(false);
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = feedsReducer(initialState, {
      type: getAllFeeds.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(undefined);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Error message' }
    };
    const state = feedsReducer(initialState, action);

    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error message');
  });
});
