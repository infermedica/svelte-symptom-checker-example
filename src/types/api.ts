import type {
  Mention,
  PatientInformation,
  SuggestedSymptom,
  SymptomDetails,
  Diagnosis,
  ExplainedEvidence,
  AgeUnit,
  Sex,
} from ".";

export namespace API {
  // POST /parse
  export namespace Parse {
    export type Request = {
      text: string;
      age: { value: number; unit: AgeUnit };
      sex: Sex;
    };

    export type Response = {
      mentions: Mention[];
      obvious: boolean;
    };
  }

  // POST /suggest
  export namespace Suggest {
    export type Request = PatientInformation;

    export type Response = SuggestedSymptom[];
  }

  // GET /symptoms:id
  export namespace SymptomsById {
    export type Query = string;

    export type Response = SymptomDetails;
  }

  // POST /diagnosis
  export namespace Diagnosis {
    // refer to documentation for extras explaination
    // https://developer.infermedica.com/docs/diagnosis
    export type Request = PatientInformation & { extras: any };

    export type Response = Diagnosis;
  }

  // POST /explain
  export namespace Explain {
    export type Request = PatientInformation & { target: string };

    export type Response = ExplainedEvidence;
  }
}
