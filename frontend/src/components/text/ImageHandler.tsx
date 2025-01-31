import { Image as TipTapImage } from '@tiptap/extension-image';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorContent, useEditor } from '@tiptap/react';

import ImageService from '@/services/image';
import Utils from '@/services/utils';

const ImageHandler: React.FC = () => {
  const editor = useEditor({
    extensions: [
      TipTapImage.extend({
        addProseMirrorPlugins: () => [
          new Plugin({
            key: new PluginKey('eventHandler'),
            props: {
              handleDrop: (view, event) => {
                let isImage = false;
                const file = event.dataTransfer?.files[0];

                let auditId: string | null = null;
                const path = window.location.pathname.split('/');
                if (path && path.length > 3 && path[1] === 'audits') {
                  auditId = path[2];
                }

                if (file && file.type.startsWith('image')) {
                  isImage = true;
                  const fileReader = new FileReader();

                  fileReader.onloadend = () => {
                    if (
                      fileReader.result instanceof ArrayBuffer ||
                      !fileReader.result
                    ) {
                      return;
                    }
                    Utils.resizeImg(fileReader.result)
                      .then(data => {
                        return ImageService.createImage({
                          value: data,
                          name: file.name,
                          auditId,
                        });
                      })
                      .then(data => {
                        const node = view.state.schema.nodes.image.create({
                          src: data.data.datas._id,
                          alt: file.name,
                        });
                        const transaction =
                          view.state.tr.replaceSelectionWith(node);
                        view.dispatch(transaction);
                      })
                      .catch(err => console.error(err));
                  };

                  fileReader.readAsDataURL(file);
                }

                if (isImage) {
                  event.preventDefault();
                  return true;
                }
              },
              handlePaste: (view, event) => {
                let isImage = false;
                const file = event.clipboardData?.files[0];

                let auditId: string | null = null;
                const path = window.location.pathname.split('/');
                if (path && path.length > 3 && path[1] === 'audits') {
                  auditId = path[2];
                }

                if (file && file.type.startsWith('image')) {
                  isImage = true;
                  const fileReader = new FileReader();

                  fileReader.onloadend = () => {
                    if (
                      fileReader.result instanceof ArrayBuffer ||
                      !fileReader.result
                    ) {
                      return;
                    }
                    Utils.resizeImg(fileReader.result)
                      .then(data => {
                        return ImageService.createImage({
                          value: data,
                          name: file.name,
                          auditId,
                        });
                      })
                      .then(data => {
                        const node = view.state.schema.nodes.image.create({
                          src: data.data.datas._id,
                          alt: file.name,
                        });
                        const transaction =
                          view.state.tr.replaceSelectionWith(node);
                        view.dispatch(transaction);
                      })
                      .catch(err => console.error(err));
                  };

                  fileReader.readAsDataURL(file);
                }

                if (isImage) {
                  event.preventDefault();
                  return true;
                }
              },
            },
          }),
        ],
      }),
    ],
  });

  return <EditorContent editor={editor} />;
};

export default ImageHandler;
