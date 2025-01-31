import './css/RichText.css';

import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import type { FC } from 'react';
import React, { useRef } from 'react';

export type RichTextProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

const RichText: FC<RichTextProps> = ({
  label = 'Rich Text',
  placeholder = 'Escribe aquí...',
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !editor) {
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        editor
          .chain()
          .focus()
          .setImage({ src: e.target.result as string })
          .run();
      }
    };
    reader.readAsDataURL(file);

    event.target.value = '';
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="rich-text-container dark-mode">
      {label ? <label className="rich-text-label">{label}</label> : null}

      <Toolbar editor={editor} onUploadClick={handleUploadClick} />

      <input
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type="file"
      />

      {/* Área editable */}
      <div className="rich-text-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

const Toolbar: FC<{ editor: Editor; onUploadClick: () => void }> = ({
  editor,
  onUploadClick,
}) => {
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl || 'https://');
    if (url === null) {
      return;
    }
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="toolbar">
      <button
        className={editor.isActive('bold') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </button>

      <button
        className={editor.isActive('italic') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </button>

      <button
        className={editor.isActive('underline') ? 'is-active' : ''}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        U
      </button>

      {/* Encabezados */}
      <button onClick={() => editor.chain().focus().setParagraph().run()}>
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>

      {/* Listas */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </button>

      {/* Link */}
      <button
        className={editor.isActive('link') ? 'is-active' : ''}
        onClick={setLink}
      >
        Link
      </button>
      <button
        disabled={!editor.isActive('link')}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        Unlink
      </button>

      <button onClick={onUploadClick}>Img</button>
    </div>
  );
};

export default RichText;
