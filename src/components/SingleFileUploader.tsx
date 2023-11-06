import { useFileContext } from "@/context";
import { ChangeEvent } from "react";
import axios from 'axios';
import { FileActionType } from "@/constants";

const SingleFileUploader = () => {
  const { state: { file, fileList }, dispatch } = useFileContext();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileNew = e.target.files;

    if (fileNew && fileNew.length > 0) {
      dispatch({
        type: FileActionType.SET_UPLOAD_FILE,
        payload: {
          file: fileNew[0],
          fileList: [...fileList, fileNew[0]]
        }
      });
    }
  };

  const handleUpload = async (e:any) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost/api/upload-file', formData)
      .then((response) => {
        if(response.data.success) {
          dispatch({
            type: FileActionType.SET_FILE_LIST,
            payload: {
              fileList: fileList
            }
          })

          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <div className = "flex flex-col gap-6">
        <div>
          <label htmlFor="file" className="sr-only">
            Choose a file
          </label>
          <input id="file" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv" onChange={handleFileChange} />
        </div>
        {file && (
          <section>
            <p className="pb-6">File details:</p>
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        )}
        
      {file && <button className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold" onClick={handleUpload}>Upload the file</button>}
    </div>
  );
};

export { SingleFileUploader };
