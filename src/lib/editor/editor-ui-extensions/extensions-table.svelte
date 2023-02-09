<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa';
	import { faTable } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;
</script>

<button
	on:click={editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run}
>
	<Fa icon={faTable} />
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
