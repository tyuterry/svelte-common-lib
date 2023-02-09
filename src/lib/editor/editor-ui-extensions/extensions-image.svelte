<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa';
	import { faImage } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';

	export let editor: Editor;

	function addImage() {
		if (editor != null) {
			const url = window.prompt('URL', '');
			// cancelled
			if (url === null) {
				return;
			}
			// empty
			if (url === '') {
				editor.chain().focus().extendMarkRange('link').unsetLink().run();
				return;
			}
			// update link
			editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

			// editor
			// 	.chain()
			// 	.focus()
			// 	.setImage({
			// 		src: 'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8='
			// 	})
			// 	.run();
			//https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=612x612&w=0&k=20&c=A63koPKaCyIwQWOTFBRWXj_PwCrR4cEoOw2S9Q7yVl8=
		}
	}
</script>

<button on:click={addImage}>
	<Fa icon={faImage} />
</button>

<style lang="scss">
</style>
