<script lang="ts">
  import Router from "svelte-spa-router";

  import Header from "./components/Header.svelte";

  import { routes } from "./routes";
</script>

<div class="mx-auto container min-h-screen h-full text-base">
  <Header class="mb-10" />
  <Router {routes} />
</div>
