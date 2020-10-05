import type {
  Symptom,
  Mention,
  ChoiceId,
  Evidence,
  DiagnosisQuestionType,
  DiagnosisQuestionOption,
  QuestionItem,
  Route,
  EvidenceSource,
} from "../types";

export const mapMentionsToSymptoms = (mentions: Mention[]): Symptom[] => {
  return mentions.map((mention) => ({
    choice_id: mention.choice_id,
    id: mention.id,
    name: mention.common_name,
  }));
};

export const filterDuplicateSymptoms = (symptoms: Symptom[]): Symptom[] => {
  return symptoms.filter(
    (nextSymptom, index, self) =>
      self.findIndex((selfSymptom) => selfSymptom.id === nextSymptom.id) ===
      index
  );
};

export const filterDuplicateEvidence = (evidence: Evidence): Evidence => {
  return evidence.filter(
    (nextEvidence, index, self) =>
      self.findIndex((selfEvidence) => selfEvidence.id === nextEvidence.id) ===
      index
  );
};

export const mapSymptomsToEvidence = (symptoms: Symptom[]): Evidence => {
  return symptoms.map((symptom) => {
    return {
      choice_id: symptom.choice_id,
      id: symptom.id,
      source: "initial" as EvidenceSource,
    };
  });
};

export const mapQuestionItemsToQuestionOptions = (
  questionItems: QuestionItem[],
  questionType: "" | DiagnosisQuestionType
) => {
  let questionOptions: DiagnosisQuestionOption[];

  if (questionType === "group_multiple") {
    questionOptions = questionItems.map((items) => ({
      choice_id: "",
      id: items.id,
    }));
  } else if ((questionType = "group_single")) {
    questionOptions = questionItems.map((items) => ({
      choice_id: "",
      id: items.id,
    }));
  } else {
    questionOptions = questionItems.map((items) => ({
      choice_id: "",
      id: items.id,
    }));
  }

  return questionOptions;
};

export const determineProgressBarWidth = (currentRoute: Route): number => {
  let progressBarWidth: number;
  if (currentRoute === "/") {
    progressBarWidth = 0;
  } else if (currentRoute === "/sex-and-age") {
    progressBarWidth = 14;
  } else if (currentRoute === "/risk-factors") {
    progressBarWidth = 28;
  } else if (currentRoute === "/initial-symptoms") {
    progressBarWidth = 42;
  } else if (currentRoute === "/geo-region") {
    progressBarWidth = 56;
  } else if (currentRoute === "/suggested-symptoms") {
    progressBarWidth = 71;
  } else if (currentRoute === "/diagnosis") {
    progressBarWidth = 85;
  } else if (currentRoute === "/results") {
    progressBarWidth = 100;
  } else {
    progressBarWidth = 0;
  }

  return progressBarWidth;
};

export const replaceEvidenceRecordsById = (
  evidenceOne: Evidence,
  evidenceTwo: Evidence
) => {
  return evidenceOne.map(
    (evidenceOneItem) =>
      evidenceTwo.find(
        (evidenceTwoItem) => evidenceTwoItem.id === evidenceOneItem.id
      ) || evidenceOneItem
  );
};

export const determineCountryChoiceId = (checked: boolean): ChoiceId => {
  let choiceId: ChoiceId;
  if (checked === true) {
    choiceId = "present";
  } else if (checked === false) {
    choiceId = "absent";
  } else {
    choiceId = "absent";
  }
  return choiceId;
};
