<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	function onSave() {
		if (editor != null) {
			const json = editor.getJSON();
			const html = editor.getHTML();

			console.log(json);
			console.log(html);
		}
	}
</script>

<button on:click={onSave}>
	<Fa icon={faFloppyDisk} />
</button>
