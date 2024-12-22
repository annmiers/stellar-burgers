import { expect, test, describe } from '@jest/globals';

import { initialState, getAllFeeds } from './feed';
import { feedsReducer } from './feed';

describe('Проверка слоя "feedsSlice"', () => {
  const feedsData = {
    orders: [
      {
        _id: '1',
        ingredients: ['1', '2', '3', '4'],
        status: 'done',
        name: '1',
        createdAt: '1',
        updatedAt: '1',
        number: 1
      },
      {
        _id: '2',
        ingredients: ['5', '6', '7', '8'],
        status: 'done',
        name: '2',
        createdAt: '2',
        updatedAt: '2',
        number: 2
      }
    ],
    total: 2,
    totalToday: 2,
    isLoading: false
  };

  test('', () => {
    const fulfilled = {
      ...initialState,
      orders: feedsData.orders,
      total: feedsData.total,
      totalToday: feedsData.totalToday,
      isLoading: false
    };

    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: feedsData
    };

    const newState = feedsReducer(initialState, action);

    expect(newState).toStrictEqual(fulfilled);
  });
});
