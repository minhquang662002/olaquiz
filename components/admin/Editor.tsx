import { ImageResize } from "quill-image-resize-module-ts";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useMemo, useCallback, useEffect, useContext } from "react";
import { COLORS } from "../../utils/constants";
import { toast } from "react-toastify";
import { imageValidation, uploadFiles } from "../../utils/fns";
import { GlobalContext } from "../context/GlobalContext";

Quill.register("modules/imageResize", ImageResize);

const Editor = ({ setContent }: any) => {
  const quillRef = useRef<ReactQuill>(null);
  const { setIsLoading } = useContext(GlobalContext);
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpeg");
    input.click();
    input.onchange = async () => {
      const file = input && input.files ? input.files[0] : null;
      if (!file) {
        return toast.error("No file selected!");
      }
      const error = imageValidation(file);
      if (error) {
        return toast.error(error);
      }
      let quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection()?.index;
      setIsLoading(true);
      const urls = await uploadFiles([file]);
      setIsLoading(false);
      if (range !== undefined) {
        quillObj?.insertEmbed(range, "image", `${urls[0]}`);
      }
    };
  }, [setIsLoading]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ color: COLORS }, { background: COLORS }],
          [{ script: "sub" }, { script: "super" }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [{ direction: "rtl" }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
          ["table"],
        ],
        handlers: {
          image: imageHandler,
        },
      },

      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
      "color",
      "background",
      "direction",
      "align",
      "script",
      "code-block",
      "size",
    ],
    []
  );

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      formats={formats}
      style={{ height: 500, width: "100%" }}
      onChange={(e) => setContent(e)}
    />
  );
};

export default Editor;
