import { apiWithInstance } from "apis/axios";
import { env } from "constants/env";
// LIB_COUNTRY_URL,
// LIB_COUNTRY_API_KEY,

export const handleGetAllCountryApi = async () => {
  return await apiWithInstance(
    env.LIB_COUNTRY_URL,
    env.LIB_COUNTRY_API_KEY,
  ).get("/");
};
