<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa';
	import { faSubscript, faSuperscript } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let isActiveSubScript = false;
	let isActiveSuperScript = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveSubScript = editor.isActive('subscript');
			isActiveSuperScript = editor.isActive('superscript');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button
	on:click={editor.chain().focus().toggleSubscript().run}
	class={isActiveSubScript ? 'is-active' : ''}
>
	<Fa icon={faSubscript} />
</button>
<button
	on:click={editor.chain().focus().toggleSuperscript().run}
	class={isActiveSuperScript ? 'is-active' : ''}
>
	<Fa icon={faSuperscript} />
</button>

<style lang="scss"></style>
