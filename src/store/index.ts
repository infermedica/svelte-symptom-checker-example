import { writable } from "svelte/store";

import type {
  PatientInformation,
  Symptom,
  Condition,
  Routes,
  EvidenceRecord,
} from "../types";
import {
  countriesWithRiskFactors,
  homeRoute,
  initialStore,
} from "../constants";

export const patientInformation = writable<PatientInformation>(initialStore);

export const progressBarWidth = writable<number>(0);

export const finalConditions = writable<Condition[]>([]);

export const initialSymptoms = writable<Symptom[]>([]);

export const suggestedSymptoms = writable<Symptom[]>([]);

export const selectedCountries = writable<
  (EvidenceRecord & { checked: boolean })[]
>(
  countriesWithRiskFactors.map((country) => ({
    choice_id: "absent",
    id: country.id,
    source: "predefined",
    checked: undefined,
  }))
);

export const visitedRoutes = writable<Routes>([homeRoute]);

export const currentDiagnosisQuestionIndex = writable<number>(0);
