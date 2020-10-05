<script lang="ts">
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";
  import debounce from "debounce";

  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Button from "../components/Button.svelte";
  import SymptomPill from "../components/SymptomPill.svelte";
  import Loader from "../components/Loader.svelte";

  import {
    mapMentionsToSymptoms,
    determineEmojiByChoiceId,
    filterDuplicateSymptoms,
    filterDuplicateEvidence,
    mapSymptomsToEvidence,
  } from "../utils/";
  import { parse } from "../services/parse";
  import { patientInformation, initialSymptoms } from "../store";
  import {
    overrideVisitedRoutes,
    updatePatientInformationEvidence,
    updateProgressBar,
  } from "../store/helpers";
  import {
    geoRegionRoute,
    homeRoute,
    initialSymptomsRoute,
    riskFactorsRoute,
    sexAndAgeRoute,
  } from "../constants";

  let patientInput = "";
  let loading = false;
  $: isNextStepAvailable = !!$initialSymptoms.length;

  onMount(() => {
    updateProgressBar();

    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
    ]);
  });

  const handleRemoveSymptom = (symptomId: string) => {
    initialSymptoms.update((initialSymptoms) => {
      return [...initialSymptoms.filter((symptom) => symptom.id !== symptomId)];
    });

    patientInformation.update((patientInformation) => {
      return {
        ...patientInformation,
        evidence: [
          ...patientInformation.evidence.filter(
            (symptom) => symptom.id !== symptomId
          ),
        ],
      };
    });
  };

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
    ]);
  };

  const handleInput = debounce(async (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    patientInput = target.value;
    loading = true;

    if (patientInput !== "") {
      const response = await parse(
        patientInput,
        $patientInformation.age.value,
        $patientInformation.sex
      );

      const fetchedSymptoms = mapMentionsToSymptoms(response.mentions);

      initialSymptoms.update((initialSymptoms) => {
        return filterDuplicateSymptoms([
          ...initialSymptoms,
          ...fetchedSymptoms,
        ]);
      });

      updatePatientInformationEvidence(
        filterDuplicateEvidence([
          ...$patientInformation.evidence,
          ...mapSymptomsToEvidence($initialSymptoms),
        ])
      );
    }
    loading = false;
  }, 1000);

  const handlePrev = () => push(riskFactorsRoute);

  const handleNext = () => {
    handleUpdateRoutes();
    push(geoRegionRoute);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Type in your symptoms" />
    <div>
      We will try to interpret human-readable language and identify your
      symptoms
    </div>
    <div>
      <label>
        <textarea
          on:input={handleInput}
          class="my-4 p-2 resize-none border rounded focus:outline-none focus:shadow-outline w-full"
          placeholder={`ex. ${'"'}My stomach hurts${'"'}`} />
      </label>
    </div>
    {#if !!$initialSymptoms.length}
      <div class="flex flex-wrap mb-4">
        {#each $initialSymptoms as symptom}
          <SymptomPill
            on:remove={() => handleRemoveSymptom(symptom.id)}
            text="{determineEmojiByChoiceId(symptom.choice_id)}{symptom.name}" />
        {/each}
      </div>
    {:else if loading}
      <div class="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
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
