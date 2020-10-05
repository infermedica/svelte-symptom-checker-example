import apiClient from "../api";
import type { PatientInformation } from "../types";
import type { API } from "../types/api";

export const suggest = (
  patientInformation: PatientInformation
): Promise<API.Suggest.Response> => {
  return apiClient.post<API.Suggest.Request>("/suggest", patientInformation);
};
