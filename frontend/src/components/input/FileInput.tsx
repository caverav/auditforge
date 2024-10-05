import React, { ChangeEvent, useState } from 'react';

type FileInputProps = {
  id: string;
  name: string;
  onFileSelect: (file: { name: string; content: string }) => void;
};

const FileInput: React.FC<FileInputProps> = ({ id, name, onFileSelect }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();

      reader.onloadend = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const base64String = arrayBufferToBase64(arrayBuffer);
        onFileSelect({ name: file.name, content: base64String });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  return (
    <div>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          accept=".doc,.docx,.docm,.ppt,.pptx"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-7 text-white-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          id={id}
          name={name}
          onChange={handleFileChange}
          type="file"
        />
      </div>
      {fileName ? (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">{fileName}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FileInput;
