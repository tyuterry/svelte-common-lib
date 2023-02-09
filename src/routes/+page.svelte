<script lang="ts">
	import Btntest from '../lib/btntest/btntest.component.svelte';
	import Editorcore from '../lib/editor/editor-core/editor-core.svelte';

	import Editortopbar from '../lib/editor/editor-ui-extensions/extensions-topbar.svelte';
	import Editorhistory from '../lib/editor/editor-ui-extensions/extensions-history.svelte';
	import Editorquickfont from '../lib/editor/editor-ui-extensions/extensions-quickfont.svelte';
	import Editorfamilyfont from '../lib/editor/editor-ui-extensions/extensions-familyfont.svelte';
	import Editoralign from '../lib/editor/editor-ui-extensions/extensions-align.svelte';
	import Editorident from '../lib/editor/editor-ui-extensions/extensions-ident.svelte';
	import EditorFormat from '../lib/editor/editor-ui-extensions/extensions-format.svelte';
	import EditorList from '../lib/editor/editor-ui-extensions/extensions-list.svelte';
	import EditorTable from '../lib/editor/editor-ui-extensions/extensions-table.svelte';
	import EditorBlock from '../lib/editor/editor-ui-extensions/extensions-block.svelte';
	import EditorTextcolor from '../lib/editor/editor-ui-extensions/extensions-textcolor.svelte';
	import EditorLink from '../lib/editor/editor-ui-extensions/extensions-link.svelte';
	import EditorSupersubscript from '../lib/editor/editor-ui-extensions/extensions-supersubscript.svelte';
	import EditorImage from '../lib/editor/editor-ui-extensions/extensions-image.svelte';
	import EditorSave from '../lib/editor/editor-ui-extensions/extensions-save.svelte';

	import { onMount } from 'svelte';

	let editor: any;
	let times: any;

	const printTo = () => {
		console.log(editor);
	};

	const onupdate = (data: any) => {
		console.log(data);
	};
	onMount(() => {
		editor = new Editorcore({
			target: document.querySelector('.editor') as HTMLElement
		}).editor;

		console.log(editor);

		new Editortopbar({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				target: document.querySelector('.topBarClass') as HTMLElement
			}
		});
		new Editorhistory({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new Editorquickfont({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new Editorfamilyfont({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new Editoralign({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new Editorident({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorBlock({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorFormat({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorList({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorTable({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorTextcolor({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorLink({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorSupersubscript({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorImage({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
		new EditorSave({
			target: document.querySelector('.topBarClass') as HTMLElement,
			props: {
				editor: editor
			}
		});
	});
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<Btntest />
<div class="topBarClass" />

<div class="editor" />
<!-- <Editorcore bind:editor /> -->

<button on:click={printTo}> print </button>
