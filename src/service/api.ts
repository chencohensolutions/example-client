import axios from "axios";
import config from "../config";

const { baseURL } = config;

console.log(baseURL);
const axiosConfig = {
  baseURL,
  timeout: 5000,
};

const axiosInstance = axios.create(axiosConfig);

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: EUserRole;
}

export enum EUserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface ILoginResponse {
  _id: string;
  email: string;
  name: string;
  role: EUserRole;
  users: IUser[];
}

export enum EReportType {
  Rates = 0,
  Water = 1,
  Electricity = 2,
}

export interface IUserUpdate extends IUser {
  password: string;
}

export interface IUserAdd {
  role: EUserRole;
  name: string;
  email: string;
  password: string;
}
interface IUpdateUserResponse {
  users: IUser[] | null;
}

const api = {
  loginToken: async (): Promise<ILoginResponse | undefined> => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const res = await axiosInstance.post("/loginToken", { token });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;
        return res.data;
      } catch (error: any) {
        switch (error.error.code) {
          case 2:
            axiosInstance.defaults.headers.common["Authorization"] = "";
            localStorage.removeItem("access_token");
            throw new Error("token expired");
        }
      }
    } else {
      throw new Error("token expired");
    }
  },
  loginPassword: async (
    email: string,
    password: string
  ): Promise<ILoginResponse | undefined> => {
    try {
      const res = await axiosInstance.post("/loginPassword", {
        email,
        password,
      });
      if (res && res.data) {
        const token = res.data.token;
        if (res.data.token) {
          localStorage.setItem("access_token", token);
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
        }
        return res.data;
      }
    } catch (err) {
      localStorage.removeItem("token");
      throw err;
    }
  },
  logout: async () => {
    axiosInstance.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
  },
  updateUser: async ({
    _id,
    name,
    email,
    role,
    password,
  }: IUserUpdate): Promise<IUpdateUserResponse> => {
    const res = await axiosInstance.patch("/users/" + _id, {
      name,
      email,
      role,
      password,
    });
    if (res && res.data) {
      return { users: res.data.users };
    }
    return { users: null };
  },
  deleteUser: async (userId: string) => {
    const res = await axiosInstance.delete("/users/" + userId);
    if (res && res.data) {
      return { users: res.data.users };
    }
    return { users: null };
  },
  addUser: async (user: IUserAdd) => {
    const res = await axiosInstance.put("/users", user);
    if (res && res.data) {
      return { users: res.data.users, _id: res.data._id };
    }
    return { users: [], _id: null };
  },
};

export default api;
