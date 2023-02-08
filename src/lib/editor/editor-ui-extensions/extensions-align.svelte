<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { createEventDispatcher, onDestroy } from 'svelte';

	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faAlignLeft,
		faAlignCenter,
		faAlignRight,
		faAlignJustify
	} from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let isActiveLeft = false;
	let isActiveCenter = false;
	let isActiveRight = false;
	let isActiveJustify = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveLeft = editor.isActive({ textAlign: 'left' });
			isActiveCenter = editor.isActive({ textAlign: 'center' });
			isActiveRight = editor.isActive({ textAlign: 'right' });
			isActiveJustify = editor.isActive({ textAlign: 'justify' });
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button
	on:click={editor.chain().focus().setTextAlign('left').run}
	class={isActiveLeft ? 'is-active' : ''}
>
	<Fa icon={faAlignLeft} />
</button>
<button
	on:click={editor.chain().focus().setTextAlign('center').run}
	class={isActiveCenter ? 'is-active' : ''}
>
	<Fa icon={faAlignCenter} />
</button>
<button
	on:click={editor.chain().focus().setTextAlign('right').run}
	class={isActiveRight ? 'is-active' : ''}
>
	<Fa icon={faAlignRight} />
</button>
<button
	on:click={editor.chain().focus().setTextAlign('justify').run}
	class={isActiveJustify ? 'is-active' : ''}
>
	<Fa icon={faAlignJustify} />
</button>
<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
