import { get } from "svelte/store";
import { pop, push } from "svelte-spa-router";

import { diagnosisRoute, homeRoute } from "../constants";
import { patientInformation, visitedRoutes } from "../store";
import {
  removePatientInformationEvidence,
  visitedRoutesContainsRoute,
} from "../store/helpers";

import type { PatientInformation, Route, RouteDetail, Routes } from "../types";

export const removeDiagnosisEvidenceRouteGuard = (detail: RouteDetail) => {
  const visitedRoutesStore = get(visitedRoutes) as Routes;
  const patientInformationStore = get(patientInformation) as PatientInformation;

  if (visitedRoutesStore.includes(diagnosisRoute)) {
    removePatientInformationEvidence(
      patientInformationStore.evidence.filter(
        (evidence) => !evidence.hasOwnProperty("source")
      ).length
    );
  }
  return true;
};

export const removeSuggestedSymptomsEvidenceRouteGuard = (detail: Route) => {
  const visitedRoutesStore = get(visitedRoutes) as Routes;
  const patientInformationStore = get(patientInformation) as PatientInformation;

  if (visitedRoutesStore.includes(diagnosisRoute)) {
    removePatientInformationEvidence(
      patientInformationStore.evidence.filter(
        (evidence) => evidence.source === "suggest"
      ).length
    );
  }
  return true;
};

export const isRouteVisitedRouteGuard = (route: Route) => {
  const result = visitedRoutesContainsRoute(route);
  if (result) {
    return true;
  } else {
    pop();
    return false;
  }
};

export const isRouteValidRouteGuard = (detail: RouteDetail) => {
  const visitedRoutesStore = get(visitedRoutes) as Routes;

  if (visitedRoutesStore.includes(detail.route)) {
    return true;
  } else {
    push(homeRoute);
    return false;
  }
};
