<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;
	export let updatetime: number = 0;

	const dispatch = createEventDispatcher();

	let undo = false;
	let redo = false;

	$: editor,
		editor?.on('update', () => {
			updatetime += 1;
			dispatch('update', {
				updatetime
			});
			undo = editor?.can().chain().focus().undo().run();
			redo = editor?.can().chain().focus().redo().run();
		});

	onDestroy(() => {
		editor?.off('update');
	});
</script>

<button on:click={editor.chain().focus().undo().run} disabled={!undo}>
	<Fa icon={faUndo} />
</button>
<button on:click={editor.chain().focus().redo().run} disabled={!redo}>
	<Fa icon={faRedo} />
</button>
<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
