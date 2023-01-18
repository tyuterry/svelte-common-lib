<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let count: number = 0;
	const dispatchEvent = createEventDispatcher();

	const increment = () => {
		count += 1;
		dispatchEvent('update', { count });
	};
</script>

<main>
	<button on:click={increment}>
		count is {count}
	</button>
</main>
