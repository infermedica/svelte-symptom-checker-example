<script lang="ts">
  import { range } from "../utils";
  export let duration = "1.2s";
</script>

<style>
  .animation {
    animation: stretch var(--duration) ease-in-out infinite;
  }
  @keyframes stretch {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
</style>

<div
  class="inline-block text-infer h-16 w-16 text-center text-sm"
  style="--duration: {duration}">
  {#each range(5, 1) as version}
    <div
      class="animation bg-infer mr-1 inline-block h-full w-2"
      style="animation-delay: {version === 2 ? '-1.1s' : version === 3 ? '-1s' : version === 4 ? '-0.9s' : version === 5 ? '-0.8s' : ''}" />
  {/each}
</div>
