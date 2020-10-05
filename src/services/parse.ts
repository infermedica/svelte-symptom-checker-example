import apiClient from "../api";
import { sexAndAgeRoute } from "../constants";
import type { Sex } from "../types";
import type { API } from "../types/api";

export const parse = (
  patientInput: string,
  age: number,
  sex: Sex
): Promise<API.Parse.Response> => {
  return apiClient.post<API.Parse.Request>("/parse", {
    text: patientInput,
    age: { value: age, unit: "year" },
    sex: sex,
  });
};
