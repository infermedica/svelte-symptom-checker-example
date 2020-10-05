<script lang="ts">
  import { afterUpdate, beforeUpdate, onDestroy, onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Loader from "../components/Loader.svelte";
  import Question from "../components/Question.svelte";
  import Radio from "../components/Radio.svelte";

  import { diagnosis } from "../services/diagnosis";
  import {
    currentDiagnosisQuestionIndex,
    finalConditions,
    patientInformation,
  } from "../store";
  import {
    filterDuplicateEvidence,
    mapQuestionItemsToQuestionOptions,
  } from "../utils";
  import {
    decrementCurrentDiangosisQuestionIndex,
    incrementCurrentDiangosisQuestionIndex,
    overrideVisitedRoutes,
    removePatientInformationEvidence,
    removeSuggestedSymptomsFromPatientInformationEvidence,
    updatePatientInformationEvidence,
    updateProgressBar,
  } from "../store/helpers";
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

  import type {
    DiagnosisQuestion,
    Diagnosis,
    ChoiceId,
    DiagnosisQuestionType,
    DiagnosisQuestionOption,
  } from "../types";

  let response: Diagnosis;
  let question: DiagnosisQuestion | null;
  let questionOptions: DiagnosisQuestionOption[] = [];
  let questionType: "" | DiagnosisQuestionType;
  let selectedGroupSingle: string;
  $: questionType = response ? response.question.type : "";
  let evidenceRecordsToRemove = 1;

  let loading = false;
  let errorMessage = "";
  let isNextStepAvailable: boolean;

  onMount(async () => {
    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
      suggestedSymptomsRoute,
      diagnosisRoute,
    ]);

    updateProgressBar();

    currentDiagnosisQuestionIndex.set(0);
    isNextStepAvailable = false;

    await fetchAndUpdateQuestion();
  });

  beforeUpdate(() => {
    // group_single questions are handled manually due to Svelte bind:group limitations

    if (response && questionType === "group_single") {
      if (selectedGroupSingle) {
        questionOptions = filterDuplicateEvidence([
          ...questionOptions.map((option) => ({
            choice_id:
              selectedGroupSingle === option.id
                ? ("present" as ChoiceId)
                : ("absent" as ChoiceId),
            id: option.id,
          })),
        ]);
      }
    }
  });

  afterUpdate(async () => {
    const shouldStopDiagnosis =
      $patientInformation.evidence.length >= 44 ||
      (response && response.should_stop);

    const isAnswerForSingleSelected =
      questionType === "single" &&
      questionOptions.length > 0 &&
      questionOptions.every(
        (option) => option.choice_id !== "" && option.choice_id !== undefined
      );
    const isAnswerForGroupSingleSelected =
      questionType === "group_single" && selectedGroupSingle !== "";

    const isAnswerForGroupMultipleSelected =
      questionType === "group_multiple" &&
      questionOptions.length > 0 &&
      questionOptions.every(
        (option) => option.choice_id !== "" && option.choice_id !== undefined
      );

    if (shouldStopDiagnosis) {
      const backButtonPointsAtSuggestedSymptoms =
        $currentDiagnosisQuestionIndex < 0;

      if (backButtonPointsAtSuggestedSymptoms) {
        push(suggestedSymptomsRoute);
      }

      finalConditions.update(() => response.conditions);
      handleUpdateRoutes();
      push(resultsRoute);
    }

    if (isAnswerForSingleSelected) {
      isNextStepAvailable = true;
    } else if (isAnswerForGroupSingleSelected) {
      isNextStepAvailable = true;
    } else if (isAnswerForGroupMultipleSelected) {
      isNextStepAvailable = true;
    } else {
      isNextStepAvailable = false;
    }
  });

  onDestroy(() => {
    selectedGroupSingle = "";
    isNextStepAvailable = false;
    loading = false;

    currentDiagnosisQuestionIndex.set(0);
  });

  const fetchAndUpdateQuestion = async () => {
    loading = true;
    isNextStepAvailable = false;

    try {
      response = await diagnosis($patientInformation);
    } catch (_) {
      errorMessage =
        "There was a problem with providing diagnostic interview. Please make sure that all previous steps are finished.";
    }

    if (response) {
      question = response.question;

      questionOptions = mapQuestionItemsToQuestionOptions(
        question.items,
        questionType
      );
    }

    loading = false;
  };

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
      suggestedSymptomsRoute,
      diagnosisRoute,
      resultsRoute,
    ]);
  };

  const handlePrev = async () => {
    const backButtonPointsAtSuggestedSymptoms =
      $currentDiagnosisQuestionIndex === 0;

    if (backButtonPointsAtSuggestedSymptoms) {
      removeSuggestedSymptomsFromPatientInformationEvidence();
      return push(suggestedSymptomsRoute);
    }

    removePatientInformationEvidence(evidenceRecordsToRemove);

    await fetchAndUpdateQuestion();

    selectedGroupSingle = "";
    isNextStepAvailable = false;
    loading = false;
    decrementCurrentDiangosisQuestionIndex();
  };

  const handleNext = async () => {
    loading = true;

    if (questionType === "group_multiple") {
      evidenceRecordsToRemove = questionOptions.length;
    }

    if (questionType === "group_single") {
      updatePatientInformationEvidence(
        filterDuplicateEvidence([
          ...$patientInformation.evidence,
          ...questionOptions
            .filter((option) => option.choice_id === "present")
            .map((option) => ({
              choice_id: option.choice_id,
              id: option.id,
            })),
        ])
      );
    } else {
      updatePatientInformationEvidence(
        filterDuplicateEvidence([
          ...$patientInformation.evidence,
          ...questionOptions.map((option) => ({
            choice_id: option.choice_id,
            id: option.id,
          })),
        ])
      );
    }

    await fetchAndUpdateQuestion();

    selectedGroupSingle = "";
    isNextStepAvailable = false;
    loading = false;
    incrementCurrentDiangosisQuestionIndex();
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Initial diagnostic interview" />
    {#if loading}
      <div class="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    {:else if question}
      <Question text={question.text} />
      <div class="my-4">
        {#each question.items as item, index}
          {#if questionType === 'group_multiple'}
            <div class="mb-4">
              <div>{item.name}</div>
              <div class="flex">
                {#each item.choices as choice}
                  <div class="flex">
                    <Radio
                      class="mr-4"
                      value={choice.id}
                      label={choice.label}
                      bind:options={questionOptions[index].choice_id} />
                  </div>
                {/each}
              </div>
            </div>
          {:else if questionType === 'group_single'}
            <div>
              <div class="flex flex-col">
                <Radio
                  class="mr-4"
                  value={questionOptions[index].id}
                  label={item.name}
                  bind:options={selectedGroupSingle} />
              </div>
            </div>
          {:else}
            <div>
              <div class="flex flex-col">
                {#each item.choices as choice}
                  <Radio
                    class="mr-4"
                    value={choice.id}
                    label={choice.label}
                    bind:options={questionOptions[index].choice_id} />
                {/each}
              </div>
            </div>
          {/if}
        {/each}
      </div>
    {:else}
      <div class="my-6">{errorMessage}</div>
    {/if}
    <div class="flex justify-between">
      <Button text="Back" on:click={handlePrev} />
      <Button
        disabled={!isNextStepAvailable}
        class={isNextStepAvailable ? '' : 'cursor-not-allowed opacity-50'}
        text="Next"
        on:click={handleNext} />
    </div>
  </Card>
</div>
