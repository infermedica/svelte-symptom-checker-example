<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Button from "../components/Button.svelte";
  import Question from "../components/Question.svelte";
  import Radio from "../components/Radio.svelte";
  import Loader from "../components/Loader.svelte";

  import { suggest } from "../services/suggest";
  import { getSymptomsById } from "../services/symptoms";
  import { patientInformation, suggestedSymptoms } from "../store/";
  import {
    overrideVisitedRoutes,
    removeSuggestedSymptomsFromPatientInformationEvidence,
    updatePatientInformationEvidence,
    updateProgressBar,
  } from "../store/helpers";
  import { filterDuplicateEvidence } from "../utils";
  import {
    diagnosisRoute,
    geoRegionRoute,
    homeRoute,
    initialSymptomsRoute,
    riskFactorsRoute,
    sexAndAgeRoute,
    suggestedSymptomsRoute,
  } from "../constants";

  import type {
    ChoiceId,
    Option,
    SuggestedSymptom,
    SymptomDetails,
  } from "../types";

  let errorMessage: string = "";
  let isNextStepAvailable: boolean;
  let loading = false;

  let questionOptions: Option[] = [];

  onMount(async () => {
    updateProgressBar();

    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
      suggestedSymptomsRoute,
    ]);

    loading = true;
    isNextStepAvailable = false;
    let fetchedSuggestedSymptoms: SuggestedSymptom[] = [];
    let fetchedDetailedSymptoms: SymptomDetails[] = [];

    try {
      fetchedSuggestedSymptoms = await suggest($patientInformation);
    } catch (_) {
      errorMessage =
        "There was a problem with providing suggested symptoms. Please make sure that all previous questions are finished.";
    }

    const noSuggestedSymptoms =
      fetchedSuggestedSymptoms.length === 0 && errorMessage === "";

    if (noSuggestedSymptoms) {
      loading = false;
      push(diagnosisRoute);
    }

    try {
      fetchedDetailedSymptoms = await Promise.all(
        fetchedSuggestedSymptoms.map((symptom) => {
          return getSymptomsById(symptom.id, $patientInformation.age.value);
        })
      );
    } catch (message) {
      errorMessage = message;
    }

    suggestedSymptoms.update((suggestedSymptoms) => [
      ...suggestedSymptoms,
      ...fetchedDetailedSymptoms.map((detailedSymptom) => ({
        id: detailedSymptom.id,
        choice_id: "" as ChoiceId,
        name: detailedSymptom.name,
      })),
    ]);

    questionOptions = fetchedDetailedSymptoms.map((detailedSymptom) => ({
      choice_id: "",
      id: detailedSymptom.id,
      source: "suggest",
      question: detailedSymptom.question,
    }));

    loading = false;
  });

  afterUpdate(() => {
    const areAllOptionsSelected =
      questionOptions.length > 0 &&
      questionOptions.every(
        (questionOption) => questionOption.choice_id !== ""
      );

    if (areAllOptionsSelected) {
      updatePatientInformationEvidence(
        filterDuplicateEvidence([
          ...$patientInformation.evidence,
          ...questionOptions.map((option) => ({
            choice_id: option.choice_id,
            id: option.id,
            source: option.source,
          })),
        ])
      );

      isNextStepAvailable = true;
    }
  });

  const handlePrev = () => {
    removeSuggestedSymptomsFromPatientInformationEvidence();
    push(geoRegionRoute);
  };

  const handleNext = () => {
    handleUpdateRoutes();
    push(diagnosisRoute);
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
    ]);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Do you have any of these symptoms?" />
    <div class="my-4">
      {#if questionOptions.length > 0}
        {#each questionOptions as option, index}
          <div class="my-4">
            <Question text={option.question} />
            <div class="flex">
              <Radio
                class="mr-4"
                value="present"
                label="Yes"
                bind:options={questionOptions[index].choice_id} />
              <Radio
                class="mr-4"
                value="absent"
                label="No"
                bind:options={questionOptions[index].choice_id} />
              <Radio
                class="mr-4"
                value="unknown"
                label="Don't know"
                bind:options={questionOptions[index].choice_id} />
            </div>
          </div>
        {/each}
      {:else if loading}
        <div class="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      {:else}
        <div class="my-6">{errorMessage}</div>
      {/if}
    </div>

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
