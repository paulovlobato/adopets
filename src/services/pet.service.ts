import axios from "axios";
import { environment } from "environments/environment";

export const petsAPI = axios.create({
  baseURL: environment.petsUrl
})


