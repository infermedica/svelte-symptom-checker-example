<script lang="ts">
  import { onMount } from "svelte";

  import { push } from "svelte-spa-router";
  import Button from "../components/Button.svelte";
  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";

  import {
    countriesWithRiskFactors,
    homeRoute,
    initialSymptomsRoute,
    riskFactorsRoute,
    sexAndAgeRoute,
    geoRegionRoute,
    suggestedSymptomsRoute,
  } from "../constants";
  import { patientInformation, selectedCountries } from "../store";
  import {
    updatePatientInformationEvidence,
    overrideVisitedRoutes,
    updateProgressBar,
  } from "../store/helpers";
  import {
    determineCountryChoiceId,
    filterDuplicateEvidence,
    replaceEvidenceRecordsById,
  } from "../utils";

  import type { Evidence } from "../types";

  onMount(() => {
    updateProgressBar();

    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
    ]);
  });

  const handleRegionSelect = () => {
    const countriesToAssign: Evidence = $selectedCountries.map((country) => ({
      choice_id: determineCountryChoiceId(country.checked),
      id: country.id,
      source: country.source,
    }));

    updatePatientInformationEvidence(
      replaceEvidenceRecordsById(
        filterDuplicateEvidence([
          ...$patientInformation.evidence,
          ...$selectedCountries,
        ]),
        countriesToAssign
      )
    );
  };

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([
      homeRoute,
      sexAndAgeRoute,
      riskFactorsRoute,
      initialSymptomsRoute,
      geoRegionRoute,
      suggestedSymptomsRoute,
    ]);
  };

  const handlePrev = () => push(initialSymptomsRoute);

  const handleNext = () => {
    handleRegionSelect();
    handleUpdateRoutes();
    push(suggestedSymptomsRoute);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card>
    <CardHeading text="Select a region you live in or you visited recently" />
    <div class="mb-6">
      <div class="mb-6">
        It is an important step for our application to identify symptoms related
        to patient's geolocation.
      </div>
      <div class="flex flex-col">
        {#each $selectedCountries as country, index}
          <label class="flex items-baseline my-2 cursor-pointer select-none">
            <input
              type="checkbox"
              class="h-4 w-4"
              bind:checked={country.checked}
              value={'present'} />
            <span
              class="ml-2">{countriesWithRiskFactors[index].countryName}</span>
          </label>
        {/each}
      </div>
    </div>
    <div class="flex justify-between">
      <Button text="Back" on:click={handlePrev} />
      <Button text="Next" on:click={handleNext} />
    </div>
  </Card>
</div>
