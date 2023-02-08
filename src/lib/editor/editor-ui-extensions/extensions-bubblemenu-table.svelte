<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faTextSlash, faEraser, faParagraph } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy } from 'svelte';

	export let editor: Editor;

	let isActiveParagraph = false;

	$: editor,
		editor?.on('transaction', () => {
			isActiveParagraph = editor.isActive('paragraph');
		});

	onDestroy(() => {
		editor?.off('transaction');
	});
</script>

<button on:click={editor?.chain()?.focus()?.addColumnBefore()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" transform="rotate-90" />
			<fa-icon
				class="mask"
				[icon]="['fas', 'square-full']"
				transform="shrink-6 right-6"
				style="color:white"
			/>
			<fa-icon
				class="mask"
				[icon]="['fas', 'square-full']"
				transform="right-12"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'plus']" transform="shrink-7 right-5 " /> -->
	</span>
</button>

<button on:click={editor?.chain()?.focus()?.addColumnAfter()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" transform="rotate-90" />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-6 left-6 "
				class="mask"
				style="color:white"
			/>
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="left-12 "
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'plus']" transform="shrink-7 left-5 " /> -->
	</span>
</button>

<button on:click={editor?.chain()?.focus()?.addRowAfter()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-6 up-6 "
				class="mask"
				style="color:white"
			/>
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="up-12 "
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'plus']" transform="shrink-7 up-5 " /> -->
	</span>
</button>

<button on:click={editor?.chain()?.focus()?.addRowBefore()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-6 down-6 "
				class="mask"
				style="color:white"
			/>
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="down-12 "
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'plus']" transform="shrink-7 down-5 " /> -->
	</span>
</button>

<button on:click={editor?.chain()?.focus()?.deleteColumn()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" transform="right-5 rotate-90" />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="right-14"
				class="mask"
				style="color:white"
			/>
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-9 left-2"
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'xmark']" transform="shrink-6 left-1" /> -->
	</span>
</button>

<button on:click={editor?.chain()?.focus()?.deleteRow()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table-cells-large']" transform="down-5 " />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="down-13.9"
				class="mask"
				style="color:white"
			/>
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-9 up-2"
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'xmark']" transform="shrink-6 up-1" /> -->
	</span>
</button>
<button on:click={editor?.chain()?.focus()?.deleteTable()?.run}>
	<span class="fa-layers fa-fw" style="overflow:hidden">
		<!-- <fa-icon [icon]="['fas', 'table']" />
			<fa-icon
				[icon]="['fas', 'square-full']"
				transform="shrink-9 down-1"
				class="mask"
				style="color:white"
			/>
			<fa-icon [icon]="['fas', 'xmark']" transform="shrink-6 down-1" /> -->
	</span>
</button>

<style lang="scss"></style>
