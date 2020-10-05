<script lang="ts">
  import { link } from "svelte-spa-router";
  import { onMount } from "svelte";

  import Card from "../components/Card.svelte";
  import CardHeading from "../components/CardHeading.svelte";

  import { homeRoute, sexAndAgeRoute } from "../constants";
  import { overrideVisitedRoutes, updateProgressBar } from "../store/helpers";

  onMount(() => {
    overrideVisitedRoutes([homeRoute]);

    updateProgressBar();
  });

  const handleUpdateRoutes = () => {
    overrideVisitedRoutes([homeRoute, sexAndAgeRoute]);
  };
</script>

<div class="flex items-center justify-center h-full">
  <Card withProgress={false}>
    <CardHeading text="Symptom checker demo" />
    <div class="flex flex-col space-y-4">
      <p>
        <span class="font-bold">
          This is a demo of a symptom checker built with Svetle and based on
          Infermedica API. Please note that:
        </span>
      </p>
      <p>
        <span class="font-bold">Checkup is not a diagnosis.</span>
        Checkup is for informational purposes and is not a qualified medical
        opinion.
      </p>
      <p>
        <span class="font-bold">Do not use in emergencies.</span>
        In case of health emergency, call your local emergency number
        immediately.
      </p>
      <p>
        <span class="font-bold">Your data is safe.</span>
        Information that you provide is anonymous and not shared with anyone.
      </p>
      <p>
        <span class="font-bold">This is a demo application for the showcase
          purpose.</span>
        Please keep in mind that this application is only a demo to showcase the
        capabilities of Infermedica API by implementing a Symptom Checker.
      </p>
      <p>
        <span class="font-bold">Go to
          <a
            href="https://symptomate.com/?utm_source=github&utm_medium=referral&utm_campaign=github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-infer font-bold">Symptomate</a>
          website to see a commercial Symptom Checker application in action.
        </span>
      </p>
      <p>
        <span class="font-bold">Go to
          <a
            href="https://developer.infermedica.com/docs/introduction/?utm_source=github&utm_medium=referral&utm_campaign=github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-infer font-bold">Infermedica Developer Portal</a>
          to find out about how the API works.
        </span>
      </p>
    </div>
    <div class="mt-4">
      <a href={sexAndAgeRoute} use:link>
        <div
          on:click={handleUpdateRoutes}
          class="text-center border bg-infer border-infer text-white rounded px-8 py-4">
          Start self checkup
        </div>
      </a>
    </div>
  </Card>
</div>
