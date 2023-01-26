import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { uploadFiles, imageValidation } from "../../utils/fns";
import { GlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<Props> = ({ content, setContent }) => {
  const editor = useRef(null);
  const { setIsLoading } = useContext(GlobalContext);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
      extraButtons: ["uploadImage", "uploadAudio"],
      tabIndex: 1,
    }),
    []
  );
  const audioHandler = useCallback(
    (editor: any) => {
      const input = document.createElement("input");

      input.setAttribute("type", "file");
      input.setAttribute("accept", "audio/*");

      input.click();
      input.onchange = async () => {
        const file = input && input.files ? input.files[0] : null;
        if (!file) {
          return toast.error("No file selected!");
        }

        setIsLoading(true);
        const urls = await uploadFiles([file]);
        const audio = editor.selection.j.createInside.element("audio");
        audio.setAttribute("src", urls[0]);
        audio.setAttribute("controls", "controls");
        editor.selection.insertNode(audio);
        setIsLoading(false);
      };
    },
    [setIsLoading]
  );

  const imageHandler = useCallback(
    (editor: any) => {
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

        setIsLoading(true);
        const urls = await uploadFiles([file]);
        const image = editor.selection.j.createInside.element("img");
        image.setAttribute("src", urls[0]);
        editor.selection.insertNode(image);
        setIsLoading(false);
      };
    },
    [setIsLoading]
  );

  Jodit.defaultOptions.controls.uploadImage = {
    name: "Upload image to Cloudinary",
    iconURL:
      "https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png",
    exec: async (editor) => {
      await imageHandler(editor);
    },
  };

  Jodit.defaultOptions.controls.uploadAudio = {
    name: "Upload audio to Cloudinary",
    iconURL:
      "https://www.kindpng.com/picc/m/200-2008049_texttospeech-audio-icon-text-to-speech-icon-hd.png",
    exec: async (editor) => {
      await audioHandler(editor);
    },
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={(newContent) => setContent(newContent)}
      onChange={(newContent) => {
        setContent(newContent);
      }}
    />
  );
};

export default Editor;
