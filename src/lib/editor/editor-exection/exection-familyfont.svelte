<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { onDestroy } from 'svelte';

	export let editor: Editor;

	let nowHeadingLevel = '';
	let nowFontFamily = '';
	let nowFontSize = '';

	$: editor,
		editor?.on('transaction', () => {
			nowHeadingLevel = editor?.getAttributes('heading')['level'] ?? '0';
			nowFontFamily = editor?.getAttributes('textStyle')['fontFamily'] ?? ' ';
			nowFontSize = editor?.getAttributes('textStyle')['fontSize'] ?? ' ';
		});

	onDestroy(() => {
		editor?.off('selectionUpdate');
	});

	function setHeading(event: any) {
		if (editor) {
			switch (event.target.value) {
				case '0':
					let level = editor.getAttributes('heading')['level'];
					if (level != undefined) {
						editor.chain().focus().toggleHeading({ level: level }).run();
					}
					break;
				case '1':
					editor.chain().focus().setHeading({ level: 1 }).run();
					break;
				case '2':
					editor.chain().focus().setHeading({ level: 2 }).run();
					break;
				case '3':
					editor.chain().focus().setHeading({ level: 3 }).run();
					break;
				case '4':
					editor.chain().focus().setHeading({ level: 4 }).run();
					break;
				case '5':
					editor.chain().focus().setHeading({ level: 5 }).run();
					break;
				case '6':
					editor.chain().focus().setHeading({ level: 6 }).run();
					break;
			}
		}
	}

	function setFamily(event: any) {
		if (editor) {
			if (event.target.value == ' ') {
				editor.chain().focus().unsetFontFamily().run();
			} else {
				editor.chain().focus().setFontFamily(event.target.value).run();
			}
		}
	}

	function setSize(event: any) {
		if (editor) {
			if (event.target.value == ' ') {
				editor.chain().focus().unsetFontSize().run();
			} else {
				editor.chain().focus().setFontSize(event.target.value).run();
			}
		}
	}
</script>

<select on:change={setHeading} bind:value={nowHeadingLevel}>
	<option value="0">段落</option>
	<option value="1">標題1</option>
	<option value="2">標題2</option>
	<option value="3">標題3</option>
	<option value="4">標題4</option>
	<option value="5">標題5</option>
	<option value="6">標題6</option>
</select>

<select on:change={setFamily} bind:value={nowFontFamily}>
	<option value=" ">預設</option>
	<option value="Inter">Inter</option>
	<option value="Comic Sans MS, Comic Sans">Comic Sans</option>
	<option value="serif">serif</option>
	<option value="monospace">monospace</option>
	<option value="cursive">cursive</option>
</select>

<select on:change={setSize} bind:value={nowFontSize}>
	<option value=" ">預設</option>
	<option value="8">8pt</option>
	<option value="10">10pt</option>
	<option value="12">12pt</option>
	<option value="14">14pt</option>
	<option value="16">16pt</option>
	<option value="20">20pt</option>
	<option value="24">24pt</option>
	<option value="32">32pt</option>
	<option value="48">48pt</option>
</select>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
