<script setup lang="ts">
import {store, fetchBranch} from '../api/repositories';
import CommitsComponent from '../components/CommitsComponent.vue';
import {Repo} from '../types';

function onBranchChange(e: Event) {
	const branchName = (e.target as HTMLInputElement).value;
	store.selectedCommits = [];
	fetchBranch(store.repo!, branchName).then((result:object) => {
		store.selectedCommits = result as Repo[];
	});
}
</script>

<template>
  <div v-if="store.repo">
    <div class="flex justify-center font-bold text-slate-800 text-3xl p-5">
      {{ store.repo!.name }}
    </div>
    <div class="flex items-center gap-2 card m-8 cursor-default  rounded-lg   transform p-3">
      <img
        src="../assets/git-branch-outline.svg"
        class="w-6"
        alt=""
      >
      <select
        v-model="store.repo!.default_branch"
        class="container   bg-gray-50 border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5   dark:placeholder-gray- dark:focus:ring-blue-500 dark:focus:border-blue-500 px-4"
        @change="(e) => onBranchChange(e)"
      >
        <option
          v-for="branch in store.branches"
          :key="branch.name"
        >
          {{ branch.name }}
        </option>
      </select>
    </div>
  </div>

  <CommitsComponent />
</template>
