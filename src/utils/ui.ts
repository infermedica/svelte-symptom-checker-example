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
import type { ChoiceId, Route } from "../types";

export const range = (size: number, startAt = 0) =>
  [...Array(size).keys()].map((i) => i + startAt);

export const determineEmojiByChoiceId = (choice_id: ChoiceId) =>
  choice_id === "present" ? "✅ " : choice_id === "absent" ? "❌ " : "🤷 ";

export const determineProgressBarWidth = (currentRoute: Route): number => {
  let progressBarWidth: number;
  if (currentRoute === homeRoute) {
    progressBarWidth = 0;
  } else if (currentRoute === sexAndAgeRoute) {
    progressBarWidth = 14;
  } else if (currentRoute === riskFactorsRoute) {
    progressBarWidth = 28;
  } else if (currentRoute === initialSymptomsRoute) {
    progressBarWidth = 42;
  } else if (currentRoute === geoRegionRoute) {
    progressBarWidth = 56;
  } else if (currentRoute === suggestedSymptomsRoute) {
    progressBarWidth = 71;
  } else if (currentRoute === diagnosisRoute) {
    progressBarWidth = 85;
  } else if (currentRoute === resultsRoute) {
    progressBarWidth = 100;
  } else {
    progressBarWidth = 0;
  }

  return progressBarWidth;
};

export const mapProbabilityToEvidence = (probability: number) => {
  let evidence:
    | "Weak evidence"
    | "Moderate evidence"
    | "Strong evidence"
    | "Very strong evidence"
    | "Insufficient evidence";

  if (probability >= 0.2 && probability < 0.4) {
    evidence = "Weak evidence";
  } else if (probability >= 0.4 && probability < 0.6) {
    evidence = "Moderate evidence";
  } else if (probability >= 0.6 && probability < 0.8) {
    evidence = "Strong evidence";
  } else if (probability >= 0.8) {
    evidence = "Very strong evidence";
  } else {
    evidence = "Insufficient evidence";
  }
  return evidence;
};
