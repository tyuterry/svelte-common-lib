<script lang="ts">
	import Fa from 'svelte-fa';

	import FaLayers from 'svelte-fa/src/fa-layers.svelte';
	import {
		faCode,
		faQuoteLeft,
		faMinus,
		faAngleRight,
		faAngleLeft,
		faArrowTurnDown
	} from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';
	import type { Editor } from '@tiptap/core';

	export let editor: Editor;

	let isActiveCodeBlock = false;
	let isActiveBlockQuote = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveCodeBlock = editor.isActive('codeBlock');
			isActiveBlockQuote = editor.isActive('blockquote');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button
	on:click={editor.chain().focus().toggleCodeBlock().run}
	class={isActiveCodeBlock ? 'is-active' : ''}
>
	<Fa icon={faCode} />
</button>
<button
	on:click={editor.chain().focus().toggleBlockquote().run}
	class={isActiveBlockQuote ? 'is-active' : ''}
>
	<Fa icon={faQuoteLeft} />
</button>
<button on:click={editor.chain().focus().setHorizontalRule().run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faMinus} scale={0.85} />
		<Fa icon={faAngleRight} scale={0.85} translateX={0.35} />
		<Fa icon={faAngleLeft} scale={0.85} translateX={-0.35} />
	</FaLayers>
</button>
<button on:click={editor.chain().focus().setHardBreak().run}>
	<Fa icon={faArrowTurnDown} rotate="90" />
</button>

<div class="divide" />

<style lang="scss">
</style>
