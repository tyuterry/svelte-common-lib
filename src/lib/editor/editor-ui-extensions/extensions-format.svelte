<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa';
	import { faTextSlash, faEraser, faParagraph } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';

	export let editor: Editor;
	let isActiveParagraph = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveParagraph = editor.isActive('paragraph');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button on:click={editor.chain().focus().unsetAllMarks().run}>
	<Fa icon={faTextSlash} />
</button>
<button on:click={editor.chain().focus().clearNodes().run}>
	<Fa icon={faEraser} />
</button>
<button
	on:click={editor.chain().focus().setParagraph().run}
	class={isActiveParagraph ? 'is-active' : ''}
>
	<Fa icon={faParagraph} />
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
