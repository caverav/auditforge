import 'katex/dist/katex.min.css';
import 'reactjs-tiptap-editor/style.css';

// import { Label } from '@headlessui/react';
// import Placeholder from '@tiptap/extension-placeholder';
import { useRef, useState } from 'react';
import RcTiptapEditor, {
  Attachment,
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  Excalidraw,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  Iframe,
  Image,
  Indent,
  Italic,
  Katex,
  Link,
  Mention,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TableOfContents,
  TaskList,
  Underline,
} from 'reactjs-tiptap-editor';

import CustomImage from './ImageHandler';

const imagesUrl = import.meta.env.VITE_API_URL + '/api/images';

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  Indent,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image,
  CustomImage,
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  ColumnActionButton,
  Table,
  Iframe,
  Excalidraw,
  Mention,
  Attachment.configure({
    upload: async (file: File) => {
      const formData = new FormData();
      formData.append('value', await file.text());
      const response = await fetch(imagesUrl, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.value;
    },
  }),
];

function debounce(func: (value: string) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: unknown, ...args: [string]) {
    clearTimeout(timeout);

    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

type RichTextProps = {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

const RichText = ({ label, onChange, placeholder, value }: RichTextProps) => {
  const [content, setContent] = useState(value || placeholder);
  const refEditor = useRef(null);

  const disable = false;

  const onValueChange = debounce((value: string) => {
    onChange(value);
    setContent(value);
  }, 300);

  return (
    <main
      style={{
        padding: '0 20px',
      }}
    >
      <p>{label}</p>
      <div className="m-4">
        <RcTiptapEditor
          content={content}
          dark={true}
          disabled={disable}
          extensions={extensions}
          onChangeContent={onValueChange}
          output="html"
          ref={refEditor}
        />
      </div>
    </main>
  );
};

export default RichText;
