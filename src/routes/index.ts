import { wrap } from "svelte-spa-router/wrap";

import Home from "../views/Home.svelte";
import SexAndAge from "../views/SexAndAge.svelte";
import InitialSymptoms from "../views/InitialSymptoms.svelte";
import GeoRegionSelection from "../views/GeoRegionSelection.svelte";
import SuggestedSymptoms from "../views/SuggestedSymptoms.svelte";
import Diagnosis from "../views/Diagnosis.svelte";
import RiskFactors from "../views/RiskFactors.svelte";
import Results from "../views/Results.svelte";

import type { RouteDetail } from "../types";
import {
  diagnosisRoute,
  geoRegionRoute,
  homeRoute,
  initialSymptomsRoute,
  resultsRoute,
  riskFactorsRoute,
  sexAndAgeRoute,
  suggestedSymptomsRoute,
} from "../constants";
import {
  isRouteValidRouteGuard,
  isRouteVisitedRouteGuard,
  removeDiagnosisEvidenceRouteGuard,
  removeSuggestedSymptomsEvidenceRouteGuard,
} from "./guards";

export const routes = {
  [homeRoute]: wrap({
    component: Home,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(homeRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [sexAndAgeRoute]: wrap({
    component: SexAndAge,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(sexAndAgeRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [riskFactorsRoute]: wrap({
    component: RiskFactors,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(riskFactorsRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [initialSymptomsRoute]: wrap({
    component: InitialSymptoms,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(initialSymptomsRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [geoRegionRoute]: wrap({
    component: GeoRegionSelection,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(geoRegionRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [suggestedSymptomsRoute]: wrap({
    component: SuggestedSymptoms,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(suggestedSymptomsRoute),
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
    ],
  }),
  [diagnosisRoute]: wrap({
    component: Diagnosis,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(diagnosisRoute),
      removeDiagnosisEvidenceRouteGuard,
    ],
  }),
  [resultsRoute]: wrap({
    component: Results,
    userData: {},
    conditions: [
      (detail: RouteDetail) => isRouteVisitedRouteGuard(resultsRoute),
    ],
  }),

  // Catch-all
  "*": wrap({
    component: Results,
    userData: {},
    conditions: [
      removeDiagnosisEvidenceRouteGuard,
      removeSuggestedSymptomsEvidenceRouteGuard,
      isRouteValidRouteGuard,
    ],
  }),
};
