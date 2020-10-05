<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleClick() {
    dispatch("remove");
  }
  export let text: string;
</script>

<div class="border border-infer rounded py-1 px-2 m-1 text-black">
  {text}
  <button
    on:click={handleClick}
    class="text-red-700 text-2xl focus:outline-none">x</button>
</div>
