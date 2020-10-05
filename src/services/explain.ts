import apiClient from "../api";
import type { PatientInformation } from "../types";
import type { API } from "../types/api";

export const explain = (
  patientInformation: PatientInformation,
  target: string
): Promise<API.Explain.Response> => {
  return apiClient.post<API.Explain.Request>("/explain", {
    ...patientInformation,
    target: target,
  });
};
