import {
  mergeAttributes,
  Node,
  nodeInputRule,
} from '@tiptap/core'

export interface ImageOptions {
  inline: boolean,
  allowBase64: boolean,
  HTMLAttributes: Record<string, never>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Add an image
       */
      setImage: (options: { src: string, alt?: string, title?: string }) => ReturnType,
    }
  }
}

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const Image = Node.create<ImageOptions>({
  name: 'image',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? 'img[src]'
          : 'img[src]:not([src^="data:"])',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    return ({ HTMLAttributes }) => {
      const dom = document.createElement('div');
      dom.style.display = 'flex';
      dom.style.position = 'relative';
      dom.style.width = 'fit-content';
      dom.style.margin = '0';


      const img = document.createElement('img');
      Object.keys(HTMLAttributes).forEach((keys) => {
        img.setAttribute(keys, HTMLAttributes[keys]);
      });

      const resizer = document.createElement('div');
      resizer.className = 'resizer';
      resizer.style.width = '10px';
      resizer.style.height = '10px';
      resizer.style.background = 'white';
      resizer.style.position = 'absolute';
      resizer.style.right = '0';
      resizer.style.bottom = '0';
      resizer.style.cursor = 'se-resize';
      resizer.style.border = '1px solid black';
      dom.appendChild(resizer);
      resizer.addEventListener('mousedown', initResize, false);

      dom.appendChild(img);
      function initResize() {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
      }
      function Resize(e: MouseEvent) {
        img.style.width = (e.clientX - dom.offsetLeft) + 'px';
        img.style.height = (e.clientY - dom.offsetTop) + 'px';
      }
      function stopResize() {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
      }

      return {
        dom,
      }
    }
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [, , alt, src, title] = match

          return { src, alt, title }
        },
      }),
    ]
  },
})
