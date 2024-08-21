import "./css/quill.snow.css";
import ReactQuill from "react-quill-new";
import { Field, Label } from "@headlessui/react";
import "./css/quill-styles.css";

interface RichTextEditorProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (content: string) => void;
}

const RichText: React.FC<RichTextEditorProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div className="p-4 w-full rounded-md border-0 text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      <Field>
        <Label className="block font-medium leading-6 text-gray-300">
          {label}
        </Label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={(value: string) => onChange(value)}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "indent",
            "link",
            "image",
            "code-block",
          ]}
          placeholder={placeholder}
          className="w-full overflow-auto bg-white mt-2 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          modules={modules}
        />
      </Field>
    </div>
  );
};
export default RichText;
