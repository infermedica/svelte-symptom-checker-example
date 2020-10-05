<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("click");
  }

  let className: string = "";
  export let text: string;
  export let disabled: boolean = false;
  export { className as class };
</script>

<button
  {disabled}
  on:click={handleClick}
  class="{className} text-center border bg-infer border-infer text-white rounded px-8 py-4 select-none">
  {text}
</button>
