import { expect, test, describe } from '@jest/globals';
import {
  getIngredientsList,
  ingredientsReducer,
  initialState
} from './ingridients';

const ingredientsMock = [
  {
    _id: '643d69a5c3f7b9001cfa0948',
    name: 'Кристаллы марсианских альфа-сахаридов',
    type: 'main',
    proteins: 234,
    fat: 432,
    carbohydrates: 111,
    calories: 189,
    price: 762,
    image: 'https://code.s3.yandex.net/react/code/core.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    __v: 0
  }
];

describe('Тестирование запроса getIngredientsList', () => {
  it('Тестирование состояния запроса "pending"', () => {
    const state = ingredientsReducer(initialState, {
      type: getIngredientsList.pending.type
    });

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'Error message' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Error message');
  });

  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: ingredientsMock
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
  });
});
