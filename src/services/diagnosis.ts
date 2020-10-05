import apiClient from "../api";
import type { PatientInformation } from "../types";
import type { API } from "../types/api";

export const diagnosis = (
  patientInformation: PatientInformation
): Promise<API.Diagnosis.Response> => {
  return apiClient.post<API.Diagnosis.Request>("/diagnosis", {
    ...patientInformation,
    extras: {
      enable_adaptive_ranking: true,
    },
  });
};
