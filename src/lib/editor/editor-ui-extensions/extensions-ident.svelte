<script lang="ts">
	import Fa from 'svelte-fa';
	import { faOutdent, faIndent } from '@fortawesome/free-solid-svg-icons';
	import type { Editor } from '@tiptap/core';
	import { getIndent, getOutdent } from '../editor-extensions/indent.extension';
	export let editor: Editor;

	function extensionOutdent() {
		if (editor) {
			let outdentFunction = getOutdent(false);
			outdentFunction({ editor: editor });
		}
	}
	function extensionIndent() {
		if (editor) {
			let indentFunction = getIndent();
			indentFunction({ editor: editor });
		}
	}
</script>

<button on:click={extensionOutdent}>
	<Fa icon={faOutdent} />
</button>
<button on:click={extensionIndent}>
	<Fa icon={faIndent} />
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
