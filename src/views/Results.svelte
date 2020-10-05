<script lang="ts">
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";
  import Modal from "../components/Modal.svelte";

  import { explain } from "../services/explain";
  import { patientInformation, finalConditions } from "../store";
  import {
    overrideVisitedRoutes,
    reset,
    updateProgressBar,
  } from "../store/helpers";
  import { mapProbabilityToEvidence } from "../utils";
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

  import type { Condition, ExplainedEvidence } from "../types";

  let showModal = false;
  let loading = false;
  let explainedEvidence: ExplainedEvidence;
  let errorMessage: string;
  let selectedCondition: Condition;

  onMount(() => {
    updateProgressBar();

    overrideVisitedRoutes([resultsRoute]);
  });

  const handleOpenModal = async (condition: Condition) => {
    loading = true;
    showModal = !showModal;
    try {
      explainedEvidence = await explain($patientInformation, condition.id);
      selectedCondition = { ...condition };
    } catch (error: any) {
      errorMessage =
        "Insufficient evidence, please retry the symptom checker process";
    }
    loading = false;
  };

  const handleStartOver = () => {
    reset();
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Initial diagnosis results" />
    <div class="flex flex-col">
      {#if $finalConditions.length > 0}
        {#each $finalConditions as condition}
          <div
            class="flex items-center justify-between shadow-sm border-2 rounded-lg border-infer p-4 mb-6">
            <div>
              <div class="text-xl font-bold">{condition.common_name}</div>
              {#if condition.name !== condition.common_name}
                <div class="text-sm text-gray-700">
                  Also called
                  {condition.name}
                </div>
              {/if}
              <div class="text-md text-infer">
                {mapProbabilityToEvidence(condition.probability)}
              </div>
            </div>
            <div class="relative">
              <Button
                text="See details"
                class="text-sm h-10 flex items-center whitespace-no-wrap"
                on:click={() => handleOpenModal(condition)} />
            </div>
          </div>
        {/each}
      {:else}
        <div>
          No conditions were identified, please retry the interview process.
        </div>
      {/if}
      <Button text="Start over" on:click={handleStartOver} />
    </div>
  </Card>
  <Modal
    {selectedCondition}
    {errorMessage}
    {loading}
    {explainedEvidence}
    bind:show={showModal} />
</div>
