<svelte:options accessors={true} />

<script lang="ts">
	import { onMount } from 'svelte';

	import { Editor } from '@tiptap/core';

	import StarterKit from '@tiptap/starter-kit';
	import { Image } from '../editor-extensions/resizeimage.extension';
	import Highlight from '@tiptap/extension-highlight';
	import Table from '@tiptap/extension-table';
	import TableCell from '@tiptap/extension-table-cell';
	import TableHeader from '@tiptap/extension-table-header';
	import TableRow from '@tiptap/extension-table-row';
	import TaskItem from '@tiptap/extension-task-item';
	import TaskList from '@tiptap/extension-task-list';
	import Superscript from '@tiptap/extension-superscript';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';
	import Subscript from '@tiptap/extension-subscript';
	import { Color } from '@tiptap/extension-color';
	import CharacterCount from '@tiptap/extension-character-count';
	import Placeholder from '@tiptap/extension-placeholder';
	import TextAlign from '@tiptap/extension-text-align';
	import { Indent } from '../editor-extensions/indent.extension';
	import { CustomBubbleMenu } from '../editor-extensions/custombubblemenu.extension';
	import FontFamily from '@tiptap/extension-font-family';
	import { TextStyleExtended } from '../editor-extensions/fontsize.extension';
	import EditorBubblemenuVue from './builtwith/extensions-bubblemenu-table.svelte';

	export let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: document.querySelector('.editorContainer') ?? undefined,
			extensions: [
				StarterKit,
				Image,
				Table.configure({
					resizable: true
				}),
				TableRow,
				TableHeader,
				TableCell,
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				Highlight.configure({ multicolor: true }),
				Link.configure({
					openOnClick: false
				}),
				Subscript,
				Superscript,
				Underline,
				Color,
				CharacterCount,
				Placeholder.configure({
					placeholder: 'Type Something...'
				}),
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Indent,
				FontFamily,
				TextStyleExtended,
				CustomBubbleMenu.configure({
					element: document.querySelector('.editorTableMenu') as HTMLElement,
					tippyOptions: {
						placement: 'bottom'
					},
					shouldShow: ({ editor, view, state, oldState, from, to }) => {
						return editor.isActive('table');
					},
					targetElement: ({ editor, view, state, oldState }) => {
						let depth = state.selection.$to.depth;
						if (!editor.isActive('table')) {
							return null;
						}
						while (depth > 1) {
							depth -= 1;
							if (state.selection.$to.node(depth).type.name == 'table') {
								return (editor.view.nodeDOM(state.selection.$to.before(depth)) as HTMLElement)
									.firstChild as HTMLElement;
							}
						}
						return null;
					}
				})
			],
			content: '<p>Example Text</p>',
			autofocus: true,
			editable: true,
			injectCSS: false
		});
	});
</script>

<div class="editorContainer" />
<div class="editorTableMenu">
	<EditorBubblemenuVue bind:editor />
</div>

<style lang="scss">
	:global {
		@import './editor-core.scss';
	}
</style>
