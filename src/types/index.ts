export type Sex = "male" | "female";

export type EvidenceSource = "initial" | "predefined" | "suggest" | "red_flags";
export type ChoiceId = "present" | "absent" | "unknown" | "";

export type Evidence = EvidenceRecord[];

export type EvidenceRecord = {
  choice_id: ChoiceId;
  id: string;
  source?: EvidenceSource;
};

export type AgeUnit = "year" | "month";

export type PatientInformation = {
  sex: Sex;
  age: { value: number; unit?: AgeUnit };
  evidence: Evidence;
};

export type Symptom = {
  choice_id: ChoiceId;
  name: string;
  id: string;
};

export type SymptomDetails = {
  id: string;
  name: string;
  common_name?: string;
  question: string;
  sex_filter: "both" | "male" | "female";
  category?: string;
  extras?: any;
  children?: any;
  image_url?: string;
  image_source?: string;
  parent_id?: string;
  parent_relation?: string;
};

export type SuggestedSymptom = {
  common_name: string;
  id: string;
  name: string;
};

export type Mention = {
  id: string;
  name: string;
  common_name: string;
  orth: string;
  choice_id: ChoiceId;
  type: string;
};

export type Option = {
  id: string;
  choice_id: ChoiceId;
  source?: EvidenceSource;
  question: string;
};

export type QuestionItem = {
  id: string;
  name: string;
  choices: { id: ChoiceId; label: string }[];
};

export type DiagnosisQuestionType =
  | "single"
  | "group_single"
  | "group_multiple";

export type DiagnosisQuestion = {
  type: DiagnosisQuestionType;
  text: string;
  items: QuestionItem[];
  extras: any;
};

export type Condition = {
  id: string;
  name: string;
  common_name: string;
  probability: number;
};

export type Diagnosis = {
  question?: DiagnosisQuestion;
  conditions: Condition[];
  extras: any;
  should_stop: boolean;
};

export type DiagnosisQuestionOption = EvidenceRecord;

export type ExplainedEvidenceRecord = {
  id: string;
  name: string;
  common_name: string;
};
export type ExplainedEvidence = {
  supporting_evidence: ExplainedEvidenceRecord[];
  conflicting_evidence: ExplainedEvidenceRecord[];
  unconfirmed_evidence: ExplainedEvidenceRecord[];
};

export type Route =
  | "/"
  | "/sex-and-age"
  | "/risk-factors"
  | "/initial-symptoms"
  | "/geo-region"
  | "/suggested-symptoms"
  | "/diagnosis"
  | "/results";

export type Routes = Route[];

export type RouteDetail = {
  route: Route;
  location: string;
  querystring: string;
  userData?: any;
};
