<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa';
	import { faUndo, faRedo } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let canToggleundo = false;
	let canToggleredo = false;

	$: editor,
		editor?.on('update', () => {
			canToggleundo = editor?.can().chain().focus().undo().run();
			canToggleredo = editor?.can().chain().focus().redo().run();
		});

	onDestroy(() => {
		editor?.off('update');
	});
</script>

<button on:click={editor.chain().focus().undo().run} disabled={!canToggleundo}>
	<Fa icon={faUndo} />
</button>
<button on:click={editor.chain().focus().redo().run} disabled={!canToggleredo}>
	<Fa icon={faRedo} />
</button>
<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
