import { expect, test, describe } from '@jest/globals';
import { createOrder, createOrderReducer, initialState } from './order';

const orderMock = {
  _id: '6769b7d4750864001d373dac',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0945',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa0947',
    '643d69a5c3f7b9001cfa0949'
  ],
  status: 'done',
  name: 'Антарианский фалленианский краторный экзо-плантаго метеоритный бургер',
  createdAt: '2024-12-23T19:19:48.181Z',
  updatedAt: '2024-12-23T19:19:49.182Z',
  number: 63907
};

describe('Тестирование запроса createOrder', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: orderMock }
    };
    const state = createOrderReducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(orderMock);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Error message' }
    };
    const state = createOrderReducer(initialState, action);

    expect(state.error).toBe('Error message');
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = createOrderReducer(initialState, {
      type: createOrder.pending.type
    });

    expect(state.orderRequest).toBe(true);
  });
});
