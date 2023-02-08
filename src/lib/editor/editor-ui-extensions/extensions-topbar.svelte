<script lang="ts">
	import { onMount } from 'svelte';

	export let target: HTMLElement | undefined = undefined;

	onMount(() => {
		target?.classList.add('editorTopBar');
	});
</script>

<slot />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
