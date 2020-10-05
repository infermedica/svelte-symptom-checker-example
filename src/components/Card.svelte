<script>
  import ProgressBar from "./ProgressBar.svelte";
  export let withProgress = true;
</script>

<div class="w-full p-8 rounded-lg shadow-lg max-w-xl bg-white">
  {#if withProgress}
    <ProgressBar />
  {/if}
  <slot />
</div>
