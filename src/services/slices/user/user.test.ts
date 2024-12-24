import { expect, test, describe } from '@jest/globals';
import {
  apiGetUser,
  initialState,
  login,
  logout,
  register,
  updateUser,
  userReducer
} from './user';

const userMock = {
  user: {
    email: 'test@mail.ru',
    name: 'testUser'
  }
};

describe('Тестирование запроса register', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { user: userMock }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userMock);
    expect(state.error).toBe('');
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Error message' }
    };
    const state = userReducer(initialState, action);

    expect(state.error).toBe('Error message');
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = userReducer(initialState, { type: register.pending.type });

    expect(state.error).toBe('');
  });
});

describe('Тестирование запроса login', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { user: userMock }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userMock);
    expect(state.error).toBe('');
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Error message' }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('Error message');
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = userReducer(initialState, { type: login.pending.type });

    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('');
  });
});

describe('Тестирование запроса apiGetUser', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: apiGetUser.fulfilled.type,
      payload: { user: userMock }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userMock);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: apiGetUser.rejected.type,
      error: { message: 'Error message' }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('Error message');
  });
});

describe('Тестирование запроса updateUser', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: userMock }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userMock);
  });

  it('Тестирование состояния запроса "rejected"', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error message' }
    };
    const state = userReducer(initialState, action);

    expect(state.isAuthChecked).toBe(false);
    expect(state.error).toBe('Error message');
  });

  it('Тестирование состояния запроса "pending"', () => {
    const state = userReducer(initialState, { type: updateUser.pending.type });

    expect(state.error).toBe('');
  });
});

describe('Тестирование запроса logout', () => {
  it('Тестирование состояния запроса "fulfilled"', () => {
    const state = userReducer(initialState, { type: logout.fulfilled.type });

    expect(state.isAuthChecked).toBe(false);
    expect(state.user).toEqual({ email: '', name: '' });
  });
});
