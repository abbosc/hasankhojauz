import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { useCallback, useEffect, useRef } from 'react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="editor-menu">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
        title="Bold"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
        title="Italic"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'active' : ''}
        title="Strikethrough"
      >
        <s>S</s>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'active' : ''}
        title="Underline"
      >
        <u>U</u>
      </button>

      <span className="editor-menu-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'active' : ''}
        title="Heading 3"
      >
        H3
      </button>

      <span className="editor-menu-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'active' : ''}
        title="Bullet List"
      >
        &bull; List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'active' : ''}
        title="Numbered List"
      >
        1. List
      </button>

      <span className="editor-menu-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'active' : ''}
        title="Blockquote"
      >
        &ldquo; Quote
      </button>

      <span className="editor-menu-divider" />

      <button
        type="button"
        onClick={setLink}
        className={editor.isActive('link') ? 'active' : ''}
        title="Add Link"
      >
        Link
      </button>
      <button
        type="button"
        onClick={addImage}
        title="Add Image"
      >
        Image
      </button>

      <span className="editor-menu-divider" />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Undo"
      >
        Undo
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Redo"
      >
        Redo
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }) {
  const initialContentSet = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Underline,
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    editorProps: {
      attributes: {
        class: 'editor-content',
        'data-placeholder': placeholder,
      },
      // Make Enter create line break
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          const { state } = view;
          const { $from } = state.selection;
          const parent = $from.parent;

          // Allow default Enter behavior in lists
          if (parent.type.name === 'listItem') {
            return false;
          }

          // Insert hard break instead of new paragraph
          view.dispatch(
            state.tr.replaceSelectionWith(
              state.schema.nodes.hardBreak.create()
            ).scrollIntoView()
          );
          return true;
        }
        return false;
      },
      // Convert pasted paragraphs to line breaks
      transformPastedHTML(html) {
        // Replace closing </p> followed by opening <p> with <br>
        // This converts paragraph breaks to line breaks
        return html
          .replace(/<\/p>\s*<p[^>]*>/gi, '<br>')
          .replace(/<p[^>]*>/gi, '')
          .replace(/<\/p>/gi, '<br>');
      },
    },
  });

  // Update editor content when prop changes (for editing existing posts)
  useEffect(() => {
    if (editor && content && !initialContentSet.current) {
      editor.commands.setContent(content);
      initialContentSet.current = true;
    }
  }, [editor, content]);

  return (
    <div className="rich-text-editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

// Component to render TipTap JSON content as HTML
export function RenderContent({ content }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content: content || '',
    editable: false,
  });

  if (!editor) return null;

  return <EditorContent editor={editor} className="rendered-content" />;
}
