<script lang="ts">
  import { fade } from "svelte/transition";

  import Loader from "./Loader.svelte";

  import type { Condition, ExplainedEvidence } from "../types";

  export let loading: boolean;
  export let explainedEvidence: ExplainedEvidence;
  export let selectedCondition: Condition;
  export let show = false;
  export let errorMessage = "";

  let showConditionName = false;
  $: showConditionName =
    selectedCondition &&
    selectedCondition.name !== selectedCondition.common_name;

  const closeModal = () => (show = false);

  const closeModalOutclick = (e: any) => {
    if ("close" in e.target.dataset) closeModal();
  };
</script>

{#if show}
  <div
    class="fixed inset-0 flex items-center justify-center bg-opacity-25 bg-gray-800 z-10"
    data-close
    on:click={closeModalOutclick}
    transition:fade={{ duration: 150 }}>
    <div
      class="relative bg-white shadow-md rounded-lg p-6 w-9/12 sm:w-7/12 md:w-6/12 lg:w-5/12 xl:w-4/12 max-h-modal overflow-scroll">
      <button
        on:click={closeModal}
        class="absolute h-4 w-4 color-infer top-0 right-0 mr-4 focus:outline-none z-20">x</button>
      {#if loading}
        <div class="w-full flex justify-center items-center">
          <Loader />
        </div>
      {:else if explainedEvidence}
        <div>
          <div class="md:text-2xl text-xl mb-2 font-bold text-infer">
            {selectedCondition.common_name}
          </div>
          {#if showConditionName}
            <div class="text-sm text-gray-600 w-64">
              Also called
              {showConditionName ? selectedCondition.name : ''}
            </div>
          {/if}
        </div>
        <div>
          {#if explainedEvidence.supporting_evidence.length > 0}
            <div class="text-black font-bold my-4">Results for</div>
            {#each explainedEvidence.supporting_evidence as supportingEvidence}
              <div>
                <div class="text-sm text-gray-600">
                  <span class="text-green-500 mr-2">↑</span>
                  {supportingEvidence.name}
                </div>
              </div>
            {/each}
          {/if}
        </div>
        <div>
          {#if explainedEvidence.conflicting_evidence.length > 0}
            <div class="text-black font-bold my-4">Results against</div>
            {#each explainedEvidence.conflicting_evidence as conflictingEvidence}
              <div>
                <div class="text-sm text-gray-600">
                  <span class="text-red-500 mr-2">↓</span>
                  {conflictingEvidence.name}
                </div>
              </div>
            {/each}
          {/if}
        </div>
      {:else}
        <div class="p-4">{errorMessage}</div>
      {/if}
    </div>
  </div>
{/if}
