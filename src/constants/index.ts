import type { AgeUnit, ChoiceId, EvidenceSource, Sex } from "../types";

export const proxyUrl = "http://localhost:3000/v3";

export const defaultRiskFactors = [
  { statement: "I'm overweight or obese", id: "p_7", selected: "" },
  { statement: "I smoke cigarettes", id: "p_28", selected: "" },
  { statement: "I’ve been recently injured", id: "p_264", selected: "" },
  { statement: "I have diabetes", id: "p_8", selected: "" },
  { statement: "I have hypertension", id: "p_9", selected: "" },
  { statement: "I have high cholesterol", id: "p_10", selected: "" },
];

export const countriesWithRiskFactors = [
  { countryName: "United States or Canada", id: "p_13" },
  { countryName: "Latin or South America", id: "p_14" },
  { countryName: "Europe", id: "p_15" },
  { countryName: "Northern Africa", id: "p_16" },
  { countryName: "Central Africa", id: "p_17" },
  { countryName: "Southern Africa", id: "p_18" },
  { countryName: "Australia or Oceania", id: "p_19" },
  { countryName: "Russia, Kazakhstan or Mongolia", id: "p_20" },
  { countryName: "Middle East", id: "p_21" },
  {
    countryName: "Asia excluding Middle East, Russia, Mongolia and Kazakhstan",
    id: "p_236",
  },
];

export const homeRoute = "/";
export const sexAndAgeRoute = "/sex-and-age";
export const riskFactorsRoute = "/risk-factors";
export const initialSymptomsRoute = "/initial-symptoms";
export const geoRegionRoute = "/geo-region";
export const suggestedSymptomsRoute = "/suggested-symptoms";
export const diagnosisRoute = "/diagnosis";
export const resultsRoute = "/results";

export const initialStore = {
  age: { value: 40, unit: "year" as AgeUnit },
  sex: "male" as Sex,
  evidence: [
    ...defaultRiskFactors.map((riskFactor) => ({
      choice_id: "" as ChoiceId,
      id: riskFactor.id,
      source: "predefined" as EvidenceSource,
    })),
  ],
};
