import AuthService from "@/services/AuthService";
import type { IUser } from "@/types/IUser";
import { AuthResponse } from "@/types/response/AuthResponse";
import axios from "axios";
import { makeAutoObservable } from "mobx";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';


export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  };

  setAuth (isAuth: boolean) {
    this.isAuth = isAuth;
  };

  setUser (user: IUser) {
    this.user = user;
  };

  setLoading (isLoading: boolean) {
    this.isLoading = isLoading;
  };

  async login (email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async registration (email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  async logout () {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  async checkAuth () {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${NEXT_PUBLIC_API_URL}/api/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }


}