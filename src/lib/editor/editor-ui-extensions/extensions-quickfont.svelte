<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa';
	import {
		faBold,
		faItalic,
		faStrikethrough,
		faUnderline
	} from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let canToggleBold = false;
	let canToggleItalic = false;
	let canToggleStrike = false;

	let boldIsActive = false;
	let italicIsActive = false;
	let strikeIsActive = false;
	let underlineIsActive = false;

	$: editor,
		editor?.on('transaction', () => {
			canToggleBold = editor?.can().chain().focus().toggleBold().run();
			canToggleItalic = editor?.can().chain().focus().toggleItalic().run();
			canToggleStrike = editor?.can().chain().focus().toggleStrike().run();

			boldIsActive = editor?.isActive('bold');
			italicIsActive = editor?.isActive('italic');
			strikeIsActive = editor?.isActive('strike');
			underlineIsActive = editor?.isActive('underline');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button
	on:click={editor.chain().focus().toggleBold().run}
	disabled={!canToggleBold}
	class={boldIsActive ? 'is-active' : ''}
>
	<Fa icon={faBold} />
</button>
<button
	on:click={editor.chain().focus().toggleItalic().run}
	disabled={!canToggleItalic}
	class={italicIsActive ? 'is-active' : ''}
>
	<Fa icon={faItalic} />
</button>
<button
	on:click={editor.chain().focus().toggleStrike().run}
	disabled={!canToggleStrike}
	class={strikeIsActive ? 'is-active' : ''}
>
	<Fa icon={faStrikethrough} />
</button>
<button
	on:click={editor.chain().focus().toggleUnderline().run}
	class={underlineIsActive ? 'is-active' : ''}
>
	<Fa icon={faUnderline} />
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
