import { handleCreateExam, readExcel } from "../../../utils/fns";
import { useRef, useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
const ExamManagement = () => {
  const excelRef = useRef<any>([]);
  const audioFiles = useRef<any>([]);
  const imageFiles = useRef<any>([]);
  const { setIsLoading } = useContext(GlobalContext);
  return (
    <div>
      <input type="text" />
      <br />
      <label>Test image:</label>
      <br />
      <input type="file" />
      <br />
      <label>Excel:</label>
      <br />
      <input
        type="file"
        onChange={async (e) => {
          if (e?.target?.files?.length) {
            const data = await readExcel(e.target.files?.[0] as File);
            excelRef.current = data;
          }
        }}
      />
      <br />
      <label>Image files:</label>
      <br />
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.some((item) => !item.type.startsWith("image"))) return;
          imageFiles.current = files;
        }}
      />
      <br />
      <label>Audio files:</label>
      <br />
      <input
        type="file"
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.some((item) => !item.type.startsWith("audio"))) return;
          audioFiles.current = files;
        }}
      />
      <button
        onClick={async () => {
          await axios.post("/api/exam");
          toast.success("created");
        }}
      >
        Test generate
      </button>
      <button
        onClick={async () => {
          setIsLoading(true);
          await handleCreateExam(
            excelRef.current,
            imageFiles.current,
            audioFiles.current
          );
          setIsLoading(false);
        }}
      >
        Tao
      </button>
    </div>
  );
};

export default ExamManagement;
