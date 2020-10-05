<script lang="ts">
  import { link } from "svelte-spa-router";

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
  import { visitedRoutes } from "../store";

  let className: string = "";
  export { className as class };

  let headerItems = [
    {
      name: "Home",
      route: homeRoute,
    },
    {
      name: "Sex and age",
      route: sexAndAgeRoute,
    },
    {
      name: "Risk factors",
      route: riskFactorsRoute,
    },
    {
      name: "Initial symptoms",
      route: initialSymptomsRoute,
    },
    {
      name: "Region selection",
      route: geoRegionRoute,
    },
    {
      name: "Suggested symptoms",
      route: suggestedSymptomsRoute,
    },
    {
      name: "Interview",
      route: diagnosisRoute,
    },
    {
      name: "Results",
      route: resultsRoute,
    },
  ];

  let show = false;
  const handleClick = () => {
    show = !show;
  };
</script>

<nav class="{className} w-full bg-infer md:bg-transparent">
  <div class="mx-auto px-2 md:px-6 lg:px-8">
    <div class="relative flex items-center justify-between h-16">
      <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
        <button
          class="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          on:click={handleClick}>
          <span class="sr-only">Open main menu</span>
          <svg
            class="{!show ? 'block' : 'hidden'} block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            class="{show ? 'block' : 'hidden'} h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        class="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
        <div class="hidden md:block md:ml-6 w-full">
          <ul class="flex justify-between">
            {#each headerItems as headerItem}
              <li class="text-infer">
                <a
                  class={`
                    ${$visitedRoutes.some((route) => route === headerItem.route) ? '' : 'cursor-not-allowed opacity-50'}
                    ${$visitedRoutes[$visitedRoutes.length - 1] === headerItem.route ? 'bg-infer text-white' : ''}
                    flex items-center w-full h-full px-3 py-2 text-sm lg:text-base`}
                  href={headerItem.route}
                  use:link>{headerItem.name}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0" />
    </div>
  </div>
  <div class="{show ? 'block' : 'hidden'} md:hidden bg-white">
    <ul class="px-2 pt-2 pb-3 space-y-1">
      {#each headerItems as headerItem}
        <li class="text-infer">
          <a
            class={`
            ${$visitedRoutes.some((route) => route === headerItem.route) ? '' : 'cursor-not-allowed opacity-50'}
            ${$visitedRoutes[$visitedRoutes.length - 1] === headerItem.route ? 'bg-infer text-white' : ''}
            block px-3 py-2 rounded-md text-base font-medium text-sm`}
            href={headerItem.route}
            use:link>{headerItem.name}</a>
        </li>
      {/each}
    </ul>
  </div>
</nav>
