<script lang="ts">
  import { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Radio from "../components/Radio.svelte";
  import Button from "../components/Button.svelte";
  import Question from "../components/Question.svelte";

  import { patientInformation } from "../store";
  import { overrideVisitedRoutes, updateProgressBar } from "../store/helpers";
  import {
    homeRoute,
    defaultRiskFactors,
    riskFactorsRoute,
    sexAndAgeRoute,
    initialSymptomsRoute,
  } from "../constants";

  $: isNextStepAvailable = $patientInformation.evidence.every(
    (riskFactor) => riskFactor.choice_id !== ""
  );

  onMount(() => {
    updateProgressBar();

    overrideVisitedRoutes([homeRoute, sexAndAgeRoute, riskFactorsRoute]);
  });

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
    ]);
  };

  const handlePrev = () => push(sexAndAgeRoute);

  const handleNext = () => {
    handleUpdateRoutes();
    push(initialSymptomsRoute);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Risk factors" />
    {#each defaultRiskFactors as riskFactor, index}
      <div class="my-4">
        <Question text={riskFactor.statement} />
        <div class="flex">
          <Radio
            class="mr-4"
            value="present"
            label="Yes"
            bind:options={$patientInformation.evidence[index].choice_id} />
          <Radio
            class="mr-4"
            value="absent"
            label="No"
            bind:options={$patientInformation.evidence[index].choice_id} />
          <Radio
            class="mr-4"
            value="unknown"
            label="Don't know"
            bind:options={$patientInformation.evidence[index].choice_id} />
        </div>
      </div>
    {/each}
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
