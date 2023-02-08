<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { onDestroy } from 'svelte';
	export let editor: Editor;

	import Fa from 'svelte-fa/src/fa.svelte';
	import { faListUl, faListOl, faListCheck } from '@fortawesome/free-solid-svg-icons';

	let isActiveBulletList = false;
	let isActiveOrderedList = false;
	let isActiveTaskList = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveBulletList = editor.isActive('bulletList');
			isActiveOrderedList = editor.isActive('orderedList');
			isActiveTaskList = editor.isActive('taskList');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button
	on:click={editor.chain().focus().toggleBulletList().run}
	class={isActiveBulletList ? 'is-active' : ''}
>
	<Fa icon={faListUl} />
</button>
<button
	on:click={editor.chain().focus().toggleOrderedList().run}
	class={isActiveOrderedList ? 'is-active' : ''}
>
	<Fa icon={faListOl} />
</button>
<button
	on:click={editor.chain().focus().toggleTaskList().run}
	class={isActiveTaskList ? 'is-active' : ''}
>
	<Fa icon={faListCheck} />
</button>

<div class="divide" />

<style lang="scss">
	:global {
		@import './index.scss';
	}
</style>
