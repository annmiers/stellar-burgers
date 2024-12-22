import { expect, test, describe } from '@jest/globals';
import { createOrder, createOrderReducer, initialState } from './order';
import { error } from 'console';

describe('Проверка слоя "createOrderSlice"', () => {
  const newOrderData = {
    name: 'Some name',
    orders: [
      {
        _id: '1',
        name: '1',
        type: 'bun',
        proteins: 100,
        fat: 20,
        carbohydrates: 15,
        calories: 250,
        price: 750,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 1
      },
      {
        _id: '12',
        name: '12',
        type: 'main',
        proteins: 100,
        fat: 20,
        carbohydrates: 15,
        calories: 250,
        price: 750,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 2
      },
      {
        _id: '123',
        name: '123',
        type: 'main',
        proteins: 123,
        fat: 123,
        carbohydrates: 123,
        calories: 123,
        price: 123,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 3
      },
      {
        _id: '1234',
        name: '1234',
        type: 'main',
        proteins: 1234,
        fat: 1234,
        carbohydrates: 1234,
        calories: 1234,
        price: 1234,
        image: 'image',
        image_mobile: 'image_mobile',
        image_large: 'image_large',
        __v: 4
      }
    ]
  };

  const mockError = {
    message: 'Bad request'
  };

  const newState = (action: { type: string; payload?: {} }) =>
    createOrderReducer(initialState, action);

  test('Тестирование состояния запроса "pending" для "createOrderSlice"', () => {
    const pending = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: createOrder.pending.type,
      payload: newOrderData
    };

    expect(newState(action)).toStrictEqual(pending);
  });

  test('Тестирование состояния запроса "rejected" для "createOrderSlice"', () => {
    const reject = {
      ...initialState,
      orderRequest: false,
      error: mockError.message
    };

    const action = {
      type: createOrder.rejected.type,
      error: mockError
    };

    expect(newState(action)).toStrictEqual(reject);
  });
});
