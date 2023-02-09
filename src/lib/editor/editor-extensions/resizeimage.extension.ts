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
      dom.className = 'EditorImgDom';

      let domHover = false

      dom.addEventListener('mouseenter', () => {
        domHover = true;
        if (domHover && !nowResize) {
          dom.classList.add('Show');
        }
      })
      dom.addEventListener('mouseleave', () => {
        domHover = false;
        if (!domHover && !nowResize) {
          dom.classList.remove('Show');
        }
      })

      const img = document.createElement('img');

      let targetResizer: HTMLElement | null;
      let imgHeight = 0;
      let imgWidth = 0;
      let nowResize = false;

      Object.keys(HTMLAttributes).forEach((keys) => {
        img.setAttribute(keys, HTMLAttributes[keys]);
      });

      const divPostions = [
        { top: '0', left: '0', },
        { top: '0', right: '0', },
        { bottom: '0', left: '0', },
        { bottom: '0', right: '0', },
        { top: '0', left: '50%', },
        { bottom: '0', right: '50%', },
        { top: '50%', left: '0', },
        { bottom: '50%', right: '0', },
      ];
      divPostions.forEach((el) => {

        const resizer = document.createElement('div');
        resizer.className = 'EditorImgResizer';
        if (el.top != undefined) resizer.style.top = el.top;
        if (el.bottom != undefined) resizer.style.bottom = el.bottom;
        if (el.left != undefined) resizer.style.left = el.left;
        if (el.right != undefined) resizer.style.right = el.right;

        resizer.style.cursor = 'se-resize';
        dom.appendChild(resizer);
        resizer.addEventListener('mousedown', initResize, false);
      });
      dom.appendChild(img);

      window.addEventListener('mousemove', Resize, false);


      function initResize(e: MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        targetResizer = <HTMLElement>e.target;
        imgHeight = img.offsetHeight;
        imgWidth = img.offsetWidth;
        nowResize = true;
        window.addEventListener('mouseup', stopResize, false);
      }

      function Resize(e: MouseEvent) {
        if (nowResize) {
          if (targetResizer?.style.top == '0px') {
            img.style.height = imgHeight + (dom.offsetTop - e.clientY) + 'px';
          }
          if (targetResizer?.style.bottom == '0px') {
            img.style.height = (e.clientY - dom.offsetTop) + 'px';
          }
          if (targetResizer?.style.left == '0px') {
            img.style.width = imgWidth - (e.clientX - dom.offsetLeft) + 'px';
          }
          if (targetResizer?.style.right == '0px') {
            img.style.width = (e.clientX - dom.offsetLeft) + 'px';
          }
        }
      }

      function stopResize() {
        nowResize = false;
        if (!domHover && !nowResize) {
          dom.classList.remove('Show');
        }
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
