import { ImageResize } from "quill-image-resize-module-ts";
import ReactQuill, { Quill } from "react-quill";
import { useRef, useMemo, useCallback, useEffect } from "react";
import { COLORS } from "../../utils/constants";
import { toast } from "react-toastify";
import { imageValidation, uploadFiles } from "../../utils/fns";

Quill.register("modules/imageResize", ImageResize);

const CustomReactQuill = ({ setContent }: any) => {
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
        ],
      },
      imageResize: {
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize"],
      },
    }),
    []
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

  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/png, image/jpeg");
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      if (!file) {
        return toast.error("No file selected!");
      }
      const error = imageValidation(file);
      if (error) {
        return toast.error(error);
      }
      let quillObj = quillRef.current?.getEditor();
      const range = quillObj?.getSelection()?.index;
      const urls = await uploadFiles([file]);
      if (range !== undefined) {
        quillObj?.insertEmbed(range, "image", `${urls[0]}`);
      }
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", imageHandler);
  }, [imageHandler]);

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

export default CustomReactQuill;
