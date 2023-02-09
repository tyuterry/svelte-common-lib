<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import Fa from 'svelte-fa';
	import FaLayers from 'svelte-fa/src/fa-layers.svelte';
	import {
		faTableCellsLarge,
		faSquareFull,
		faPlus,
		faXmark,
		faTable
	} from '@fortawesome/free-solid-svg-icons';
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
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} rotate="90" />
		<Fa icon={faSquareFull} class="mask" scale={0.6} translateX={0.36} style="color:white" />
		<Fa icon={faSquareFull} class="mask" translateX={0.72} style="color:white" />
		<Fa icon={faPlus} scale={0.5} translateX={0.35} />
	</FaLayers>
</button>

<button on:click={editor?.chain()?.focus()?.addColumnAfter()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} rotate="90" />
		<Fa icon={faSquareFull} class="mask" scale={0.6} translateX={-0.36} style="color:white" />
		<Fa icon={faSquareFull} class="mask" translateX={-0.72} style="color:white" />
		<Fa icon={faPlus} scale={0.5} translateX={-0.35} />
	</FaLayers>
</button>

<button on:click={editor?.chain()?.focus()?.addRowAfter()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} />
		<Fa
			icon={faSquareFull}
			class="mask"
			scale={0.6}
			translateY={-0.36}
			rotate="90"
			style="color:white"
		/>
		<Fa icon={faSquareFull} class="mask" translateY={-0.72} style="color:white" />
		<Fa icon={faPlus} scale={0.5} translateY={-0.3} />
	</FaLayers>
</button>

<button on:click={editor?.chain()?.focus()?.addRowBefore()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} />
		<Fa
			icon={faSquareFull}
			class="mask"
			scale={0.6}
			translateY={0.36}
			rotate="90"
			style="color:white"
		/>
		<Fa icon={faSquareFull} class="mask" translateY={0.72} style="color:white" />
		<Fa icon={faPlus} scale={0.5} translateY={0.3} />
	</FaLayers>
</button>

<button on:click={editor?.chain()?.focus()?.deleteColumn()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} translateX={0.2} rotate="90" />
		<Fa icon={faSquareFull} class="mask" translateX={0.75} style="color:white" />
		<Fa icon={faSquareFull} class="mask" scale={0.4} translateX={-0.2} style="color:white" />
		<Fa icon={faXmark} scale={0.5} translateX={-0.2} />
	</FaLayers>
</button>

<button on:click={editor?.chain()?.focus()?.deleteRow()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTableCellsLarge} translateY={-0.2} />
		<Fa icon={faSquareFull} class="mask" translateY={-0.75} style="color:white" />
		<Fa icon={faSquareFull} class="mask" scale={0.4} translateY={0.2} style="color:white" />
		<Fa icon={faXmark} scale={0.5} translateY={0.2} />
	</FaLayers>
</button>
<button on:click={editor?.chain()?.focus()?.deleteTable()?.run}>
	<FaLayers style="overflow:hidden">
		<Fa icon={faTable} />
		<Fa icon={faSquareFull} class="mask" scale={0.4} translateY={0.05} style="color:white" />
		<Fa icon={faXmark} scale={0.5} translateY={0.05} />
	</FaLayers>
</button>

<style lang="scss">
</style>
