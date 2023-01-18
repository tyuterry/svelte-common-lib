<script lang="ts">
	import Btntest from '../lib/btntest/btntest.component.svelte';
	import Editorcore from '../lib/editor/editor-core/editor-core.svelte';

	import Editortopbar from '../lib/editor/editor-exection/exection-topbar.svelte';
	import Editorhistory from '../lib/editor/editor-exection/exection-history.svelte';
	import Editorquickfont from '../lib/editor/editor-exection/exection-quickfont.svelte';
	import Editorfamilyfont from '../lib/editor/editor-exection/exection-familyfont.svelte';
	import Editoralign from '../lib/editor/editor-exection/exection-align.svelte';

	let editor: any;
	let times: any;

	const printTo = () => {
		console.log(editor);
	};

	const onupdate = (data: any) => {
		console.log(data);
	};
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Btntest />
<div class="editorTopBar">
	<Editortopbar>
		<Editoralign {editor} />
		<Editorhistory {editor} bind:updatetime={times} on:update={onupdate} />
		<Editorquickfont {editor} />
		<Editorfamilyfont {editor} />
	</Editortopbar>
</div>

<Editorcore bind:editor />

<button on:click={printTo}> print </button>
