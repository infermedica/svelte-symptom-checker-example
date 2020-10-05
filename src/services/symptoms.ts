import apiClient from "../api";
import type { API } from "../types/api";

export const getSymptomsById = (
  symptomId: API.SymptomsById.Query,
  age: number
): Promise<API.SymptomsById.Response> => {
  return apiClient.get(
    `/symptoms/${symptomId}?age.value=${age}&age.unit=year`,
    {}
  );
};
