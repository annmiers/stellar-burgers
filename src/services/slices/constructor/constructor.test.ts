import { expect, test, describe } from '@jest/globals';
import {
  addItem,
  clearAll,
  constructorReducer,
  deleteItem,
  initialState,
  updateAll
} from './constructor';
import { v4 } from 'uuid';

const bunTest = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  __v: 0,
  id: 'fix-id'
};

const ingredientTest = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  id: 'fix-id'
};

const ingredientTest2 = {
  _id: '643d69a5c3f7b9001cfa0947',
  name: 'Плоды Фалленианского дерева',
  type: 'main',
  proteins: 20,
  fat: 5,
  carbohydrates: 55,
  calories: 77,
  price: 874,
  image: 'https://code.s3.yandex.net/react/code/sp_1.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
  __v: 0,
  id: 'fix-id'
};

jest.mock('uuid', () => ({ v4: () => 'fix-id' }));

describe('Тестирование constructorReducer', () => {
  describe('Добавление ингредиентов (addItem)', () => {
    test('Добавление булки в конструктор', () => {
      const state = constructorReducer(initialState, addItem(bunTest));

      expect(state.bun).toEqual(bunTest);
    });

    test('Добавление начинки в конструктор', () => {
      const state = constructorReducer(initialState, addItem(ingredientTest));

      expect(state.ingredients).toEqual([ingredientTest]);
    });

    test('Удаление ингредиента из конструктора', () => {
      const state = constructorReducer(initialState, addItem(ingredientTest));
      const newState = constructorReducer(state, deleteItem(ingredientTest));

      expect(newState.ingredients).toEqual([]);
    });

    test('Перемещение игредиента вверх', () => {
      const state = {
        ...initialState,
        ingredients: [ingredientTest, ingredientTest2]
      };
      function swapElements(
        state: (typeof ingredientTest)[],
        index: number,
        step: number
      ) {
        const copy = [...state];
        copy[index] = copy.splice(index + step, 1, copy[index])[0];
        return copy;
      }
      const newState = constructorReducer(
        state,
        updateAll(swapElements(state.ingredients, 0, -1))
      );

      expect(newState.ingredients).toEqual([ingredientTest2, ingredientTest]);
    });

    test('Перемещение игредиента вниз', () => {
      const state = {
        ...initialState,
        ingredients: [ingredientTest, ingredientTest2]
      };
      function swapElements(
        state: (typeof ingredientTest)[],
        index: number,
        step: number
      ) {
        const copy = [...state];
        copy[index] = copy.splice(index + step, 1, copy[index])[0];
        return copy;
      }
      const newState = constructorReducer(
        state,
        updateAll(swapElements(state.ingredients, 0, 1))
      );

      expect(newState.ingredients).toEqual([ingredientTest2, ingredientTest]);
    });

    test('Очистка конструктора', () => {
      const state = {
        ...initialState,
        bun: bunTest,
        ingredients: [ingredientTest, ingredientTest2]
      };

      const newState = constructorReducer(state, clearAll());

      expect(newState).toEqual(initialState);
    });
  });
});
