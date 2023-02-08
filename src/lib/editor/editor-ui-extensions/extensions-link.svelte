<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { onDestroy } from 'svelte';

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faLink, faLinkSlash } from '@fortawesome/free-solid-svg-icons';

	export let editor: Editor;

	let isActiveLink = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveLink = editor.isActive('link');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});

	function toggleLink() {
		if (editor != null && !editor.isActive('link')) {
			const previousUrl = editor.getAttributes('link')['href'];
			const url = window.prompt('URL', previousUrl);
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
		} else if (editor != null && editor.isActive('link')) {
			editor.chain().focus().unsetLink().run();
		}
	}
</script>

<button on:click={toggleLink}>
	{#if !isActiveLink}
		<Fa icon={faLink} />
	{/if}
	{#if isActiveLink}
		<Fa icon={faLinkSlash} />
	{/if}
</button>

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
