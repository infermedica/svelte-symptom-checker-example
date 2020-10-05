import { get } from "svelte/store";
import { location } from "svelte-spa-router";
import {
  patientInformation,
  visitedRoutes,
  progressBarWidth,
  currentDiagnosisQuestionIndex,
} from ".";
import type { EvidenceRecord, Route, Routes } from "../types";
import { determineProgressBarWidth } from "../utils";

export const updatePatientInformationEvidence = (
  newEvidence: EvidenceRecord[]
) => {
  patientInformation.update((patientInformation) => ({
    ...patientInformation,
    evidence: newEvidence,
  }));
};

export const removePatientInformationEvidence = (
  numberOfItemsToRemove: number
) => {
  patientInformation.update((patientInformation) => ({
    ...patientInformation,
    evidence: patientInformation.evidence.slice(
      0,
      patientInformation.evidence.length - numberOfItemsToRemove
    ),
  }));
};

export const removeSuggestedSymptomsFromPatientInformationEvidence = () => {
  patientInformation.update((patientInformation) => ({
    ...patientInformation,
    evidence: patientInformation.evidence.filter(
      (evidence) => evidence.source !== "suggest"
    ),
  }));
};

export const visitedRoutesContainsRoute = (route: Route): boolean => {
  const foundVisitedRoutes = get(visitedRoutes);
  if ((foundVisitedRoutes as Routes).length) {
    const result = (foundVisitedRoutes as Routes).some((foundRoute) => {
      return foundRoute === route;
    });
    return result;
  }
  return false;
};

export const overrideVisitedRoutes = (routes: Routes) => {
  visitedRoutes.update((visitedRoutes) => (visitedRoutes = [...routes]));
};

export const updateProgressBar = () => {
  const route: Route = get(location);
  progressBarWidth.update(() => determineProgressBarWidth(route));
};

export const incrementCurrentDiangosisQuestionIndex = () =>
  currentDiagnosisQuestionIndex.update(
    (currentDiagnosisQuestionIndex) => currentDiagnosisQuestionIndex + 1
  );

export const decrementCurrentDiangosisQuestionIndex = () =>
  currentDiagnosisQuestionIndex.update(
    (currentDiagnosisQuestionIndex) => currentDiagnosisQuestionIndex - 1
  );

export const reset = () => {
  window.location.reload();
};
