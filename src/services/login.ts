import { serviceRoutes } from "@/types/serviceRoutes";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const login = async (email: string, password: string) => {
  const result = await axios.post(serviceRoutes.loginUrl, {
    email: email,
    password: password,
  })
  console.log(result);
  return result;
}