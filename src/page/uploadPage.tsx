import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChangeEvent } from "react";
import multer from "multer";
import { storage } from "../service/firebase";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  }

  useEffect(() => {
    const loadDataAsync = async () => {};
    loadDataAsync();
  }, []);

  return (
    <>
      <TextField type="file" size="small" onChange={selectFile} />
      <Button variant="contained" onClick={upload}>
        Upload File
      </Button>
    </>
  );

  async function upload() {
    if (file) {
      console.log(file);
      console.log("Uploading");
      const url = `http://localhost:3000/upload`;
      const body = {
        // Attribute of JSON : Attribute file in Component
        file: file,
        uid: "40",
        name: "kit",
      };
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const result = response.data;
      console.log(result);

      const data = await axios.get("http://localhost:3000/image");
    }else {
      console.log("ไม่มีไฟล์");
    }
  }
}

export default UploadPage;
