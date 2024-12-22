import { initialState, login, logout, register, updateUser } from './user';
import { expect, test, describe } from '@jest/globals';

import { userReducer, apiGetUser } from './user';

describe('Проверка слоя "userSlice"', () => {
  const mockUser = {
    user: {
      email: 'test@test.ru',
      name: 'user'
    }
  };

  const userError = {
    message: 'Ошибка'
  };

  const newState = (action: { type: string; payload?: {} }) =>
    userReducer(initialState, action);

  describe('Проверка getApiUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния запроса "fulfilled" для "apiGetUser"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: ''
      };

      const action = {
        type: apiGetUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния запроса "rejected" для  "apiGetUser"', () => {
      const rejected = {
        ...initialState,
        isAuthChecked: false,
        error: userError.message
      };

      const action = {
        type: apiGetUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Тесты для проверки регистрации пользователя
  describe('Проверка registerUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния запроса "pending" для "register"', () => {
      const pending = {
        ...initialState,
        error: ''
      };

      const action = {
        type: register.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния запроса "fulfilled" для "register"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: ''
      };

      const action = {
        type: register.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния запроса "rejected" для "register"', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };

      const action = {
        type: register.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Логирование пользователя
  describe('Проверка login пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "pending" для login', () => {
      const pending = {
        ...initialState,
        isAuthChecked: false,
        error: ''
      };

      const action = {
        type: login.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния "fulfilled" для login', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: ''
      };

      const action = {
        type: login.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния "rejected" для login', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };

      const action = {
        type: login.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });

  // Разлогирование пользователя
  describe('Проверка logout пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "fulfilled" для "logout"', () => {
      const action = {
        type: logout.fulfilled.type
      };

      expect(newState(action)).toStrictEqual(initialState);
    });
  });

  // Обновление информации о пользователе
  describe('Проверка updateUser пользователя слоя "userSlice"', () => {
    test('Тестирование состояния "pending" для "updateUser"', () => {
      const pending = {
        ...initialState,
        error: ''
      };
      const action = {
        type: updateUser.pending.type
      };

      expect(newState(action)).toStrictEqual(pending);
    });

    test('Тестирование состояния "fulfilled" для "updateUser"', () => {
      const fulfilled = {
        ...initialState,
        isAuthChecked: true,
        user: mockUser.user,
        error: ''
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };

      expect(newState(action)).toStrictEqual(fulfilled);
    });

    test('Тестирование состояния "rejected" для "updateUser"', () => {
      const rejected = {
        ...initialState,
        error: userError.message
      };
      const action = {
        type: updateUser.rejected.type,
        error: userError
      };

      expect(newState(action)).toStrictEqual(rejected);
    });
  });
});
