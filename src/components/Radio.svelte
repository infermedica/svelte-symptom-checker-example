<script lang="ts">
  export let options: string = undefined;
  export let value: string;
  export let label: string;
  let className: string = "";
  export { className as class };
</script>

<label class="{className} flex items-center mt-3 cursor-pointer select-none">
  <input
    bind:group={options}
    {value}
    type="radio"
    class="h-5 w-5 cursor-pointer text-infer" />
  <span class="ml-2 text-black">{label || value}</span>
</label>
