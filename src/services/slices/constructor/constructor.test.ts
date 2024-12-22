import { array } from './../../../../node_modules/@types/prop-types/index.d';
import { expect, test, describe } from '@jest/globals';
import {
  addItem,
  clearAll,
  constructorReducer,
  deleteItem,
  initialState,
  updateAll
} from './constructor';

describe('Проверка слоя "constructorSlice"', () => {
  const bun = {
    _id: '643d69a5c3f7b9001cfa093c',
    id: 'testId_1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
  };

  const cartIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    id: 'test',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
  };

  const newCartIngredient = {
    _id: '643d69a5c3f7b9001cfa0946',
    id: 'testId_3',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    proteins: 808,
    fat: 689,
    carbohydrates: 609,
    calories: 986,
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
    image_large:
      'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
    image_mobile:
      'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png'
  };

  test('Должен вернуть начальное состояние по умолчанию', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Тестирование добавления булочки в "constructorSlice"', () => {
    const action = addItem(bun);
    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  test('Тестирование добавления ингредиента в "constructorSlice"', () => {
    const action = addItem(cartIngredient);
    const newState = constructorReducer(initialState, action);
    // expect(newState.ingredients).toEqual([cartIngredient]);
    expect(newState.ingredients[0]).toEqual({
      ...cartIngredient,
      id: expect.any(String)
    });
  });

  test('Удаление ингредиента', () => {
    const actionAdd = addItem(cartIngredient);
    const stateWithIngredient = constructorReducer(initialState, actionAdd);
    const actionRemove = deleteItem(stateWithIngredient.ingredients[0]);
    const newState = constructorReducer(stateWithIngredient, actionRemove);
    expect(newState.ingredients).toEqual([]);
  });

  test('Перемещение ингредиента вверх', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [cartIngredient, newCartIngredient]
    };
    function swapElements(
      state: (typeof cartIngredient)[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const action = updateAll(
      swapElements(stateWithIngredients.ingredients, 0, -1)
    );
    const newState = constructorReducer(stateWithIngredients, action);
    expect(newState.ingredients).toEqual([newCartIngredient, cartIngredient]);
  });

  test('Перемещение ингредиента вниз', () => {
    const stateWithIngredients = {
      ...initialState,
      ingredients: [cartIngredient, newCartIngredient]
    };
    function swapElements(
      state: (typeof cartIngredient)[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const action = updateAll(
      swapElements(stateWithIngredients.ingredients, 0, 1)
    );
    const newState = constructorReducer(stateWithIngredients, action);
    expect(newState.ingredients).toEqual([newCartIngredient, cartIngredient]);
  });

  test('Очистка корзины', () => {
    const stateWithIngredients = {
      bun: bun,
      ingredients: [cartIngredient, newCartIngredient]
    };

    const action = clearAll();
    const newState = constructorReducer(stateWithIngredients, action);

    expect(newState).toEqual(initialState);
  });
});
