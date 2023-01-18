<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faBold,
		faItalic,
		faStrikethrough,
		faUnderline
	} from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let toggleBold = false;
	let toggleItalic = false;
	let toggleStrike = false;

	let boldIsActive = false;
	let italicIsActive = false;
	let strikeIsActive = false;
	let underlineIsActive = false;

	$: editor,
		editor?.on('transaction', () => {
			toggleBold = editor?.can().chain().focus().toggleBold().run();
			toggleItalic = editor?.can().chain().focus().toggleItalic().run();
			toggleStrike = editor?.can().chain().focus().toggleStrike().run();

			boldIsActive = editor?.isActive('bold');
			italicIsActive = editor?.isActive('italic');
			strikeIsActive = editor?.isActive('strike');
			underlineIsActive = editor?.isActive('underline');
		});

	onDestroy(() => {
		editor?.off('selectionUpdate');
	});
</script>

<button
	on:click={editor.chain().focus().toggleBold().run}
	disabled={!toggleBold}
	class={boldIsActive ? 'is-active' : ''}
>
	<Fa icon={faBold} />
</button>
<button
	on:click={editor.chain().focus().toggleItalic().run}
	disabled={!toggleItalic}
	class={italicIsActive ? 'is-active' : ''}
>
	<Fa icon={faItalic} />
</button>
<button
	on:click={editor.chain().focus().toggleStrike().run}
	disabled={!toggleStrike}
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
