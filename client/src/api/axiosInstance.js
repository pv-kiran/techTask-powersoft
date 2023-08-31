import axios from "axios";
import { Baseurl } from "../constants/endpoints";

export const apiInstance = axios.create({
  baseURL: Baseurl,
});
