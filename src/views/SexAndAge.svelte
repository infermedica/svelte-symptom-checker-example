<script lang="ts">
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Question from "../components/Question.svelte";
  import Button from "../components/Button.svelte";
  import Radio from "../components/Radio.svelte";

  import { patientInformation } from "../store/";
  import { overrideVisitedRoutes, updateProgressBar } from "../store/helpers";
  import { homeRoute, riskFactorsRoute, sexAndAgeRoute } from "../constants";

  onMount(() => {
    overrideVisitedRoutes([homeRoute, sexAndAgeRoute]);
    updateProgressBar();
  });

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([homeRoute, sexAndAgeRoute, riskFactorsRoute]);
  };

  const handlePrev = () => push(homeRoute);

  const handleNext = () => {
    handleUpdateRoutes();
    push(riskFactorsRoute);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Initial information gathering" />
    <Question text="How old are you?" />
    <h2>Selected age: {$patientInformation.age.value}</h2>
    <label class="flex flex-col mb-6">
      <input
        class="w-64"
        type="range"
        bind:value={$patientInformation.age.value}
        min="18"
        max="130" />
    </label>
    <div class="flex flex-col my-4">
      <Question text="What is your assigned sex?" />
      <Radio label="Male" value="male" bind:options={$patientInformation.sex} />
      <Radio
        label="Female"
        value="female"
        bind:options={$patientInformation.sex} />
    </div>
    <div class="flex justify-between">
      <Button text="Back" on:click={handlePrev} />
      <Button text="Next" on:click={handleNext} />
    </div>
  </Card>
</div>
