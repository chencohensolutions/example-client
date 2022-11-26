import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api, {
  EUserRole,
  IUser,
  IUserAdd,
  IUserUpdate,
} from "../../service/api";

export enum ELoginState {
  idle = 0,
  pending,
  success,
  error,
}

interface IUserState {
  users: IUser[];
  _id?: string;
  email?: string;
  name?: string;
  role?: EUserRole;
  loginState: ELoginState;
  isLoggedin: boolean;
  tokenExpired: boolean;
  newUserId: null;
}

export const logout = createAction("session/logout");

export const loginPassword = createAsyncThunk(
  "session/loginPassword",
  async ({ email, password }: { password: string; email: string }) => {
    const response = await api.loginPassword(email, password);
    return response;
  }
);

export const loginToken = createAsyncThunk("session/loginToken", async () => {
  const response = await api.loginToken();
  return response;
});

export const deleteUser = createAsyncThunk(
  "session/deleteUser",
  async (userId: string) => {
    const response = await api.deleteUser(userId);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  "session/updateUser",
  async (user: IUserUpdate) => {
    const response = await api.updateUser(user);
    return response;
  }
);

export const addUser = createAsyncThunk(
  "session/addUser",
  async (user: IUserAdd) => {
    const response = await api.addUser(user);
    return response;
  }
);

const userReducer = createReducer(
  {
    loginState: ELoginState.idle,
    tokenExpired: false,
    users: [],
    isLoggedin: false,
    newUserId: null,
  } as IUserState,
  (builder) => {
    builder
      .addCase(loginToken.pending, (state) => {
        state.loginState = ELoginState.pending;
        state.isLoggedin = false;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        state.loginState = ELoginState.success;
        state.tokenExpired = false;
        state.isLoggedin = true;
        state.role = action.payload?.role;
        state.users = action.payload?.users ? action.payload.users : [];
      })
      .addCase(loginToken.rejected, (state) => {
        state.loginState = ELoginState.idle;
        state.tokenExpired = true;
        state.isLoggedin = false;
      })
      .addCase(loginPassword.fulfilled, (state, action) => {
        state.loginState = ELoginState.success;
        state.tokenExpired = false;
        state.isLoggedin = true;
        state.role = action.payload?.role;
        state.users = action.payload?.users ? action.payload.users : [];
      })
      .addCase(loginPassword.pending, (state) => {
        state.loginState = ELoginState.pending;
      })
      .addCase(loginPassword.rejected, (state) => {
        state.loginState = ELoginState.error;
        state.isLoggedin = false;
      })
      .addCase(logout, (state) => {
        state.loginState = ELoginState.idle;
        state.tokenExpired = true;
        state.isLoggedin = false;
      })
      .addCase(updateUser.pending, (state, { meta }) => {
        const {
          _id: newId,
          name: newName,
          email: newEmail,
          role: newRole,
        } = meta.arg;
        state.users = state.users.map((userRecord) => {
          let { _id, email, name, role } = userRecord;
          if (userRecord._id === newId) {
            email = newEmail;
            name = newName;
            role = newRole;
          }
          return { _id, email, name, role };
        });
        console.log("state", state, meta);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload?.users) {
          state.users = action.payload.users;
        }
      })
      .addCase(deleteUser.pending, (state, { meta: { arg: userId } }) => {
        state.users = state.users.filter(
          (userRecord) => userRecord._id !== userId
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload?.users) {
          state.users = action.payload.users;
        }
      })
      .addCase(addUser.pending, (state, { meta: { arg } }) => {
        const { email, name, role } = arg;
        state.users.push({ _id: "", email, name, role });
      })
      .addCase(addUser.fulfilled, (state, action) => {
        if (action.payload?.users) {
          state.users = action.payload.users;
          state.newUserId = action.payload._id;
        }
      });
  }
);

export default userReducer;
