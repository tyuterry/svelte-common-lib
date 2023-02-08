<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faA, faHighlighter } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';

	export let editor: Editor;

	let nowTextColor = '#000000';
	let nowBackgruondColor = '#000000';

	$: editor,
		editor?.on('transaction', () => {
			nowTextColor = editor.getAttributes('textStyle')['color'] ?? '#000000';
			nowBackgruondColor = editor.getAttributes('highlight')['color'] ?? '#000000';
		});

	onDestroy(() => {
		editor?.off('transaction');
	});

	function onSetTextColor(event: any) {
		if (editor != null) {
			editor
				.chain()
				.focus()
				.setColor((event.target as HTMLInputElement).value)
				.run();
		}
	}

	function onSetTextColorClick(event: any) {
		document.getElementById('textColorSetter')?.click();
	}

	function onSetBackgroundColor(event: any) {
		if (editor != null) {
			editor
				.chain()
				.focus()
				.setHighlight({ color: (event.target as HTMLInputElement).value })
				.run();
		}
	}
	function onSetBackgroundColorClick(event: any) {
		document.getElementById('textBackgruondColorSetter')?.click();
	}
</script>

<button on:click={onSetTextColorClick}>
	<Fa icon={faA} translateY={0.1} />
	<div class="colorBar" style:background-color={nowTextColor} />
	<input
		id="textColorSetter"
		style="width:0;padding:0px;margin:0;opacity:0;height:0"
		type="color"
		on:change={onSetTextColor}
		bind:value={nowTextColor}
	/>
</button>
<button on:click={onSetBackgroundColorClick}>
	<Fa icon={faHighlighter} />
	<div class="colorBar" style:background-color={nowBackgruondColor} />
	<input
		id="textBackgruondColorSetter"
		style="width:0;padding:0px;margin:0;opacity:0;height:0"
		type="color"
		on:change={onSetBackgroundColor}
		bind:value={nowBackgruondColor}
	/>
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
	.flex-Col {
		display: flex;
		flex-direction: row;
	}
</style>
