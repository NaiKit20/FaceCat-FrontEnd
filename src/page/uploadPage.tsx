import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChangeEvent } from "react";
import { ImageGetReq } from "../model/Response/ImageGetRes";

function UploadPage() {
  const [file, setFile] = useState();
  const [img, setImage] = useState<ImageGetReq[]>([]);

  useEffect(() => {
    const loadDataAsync = async () => {
      const res = await axios.get("http://localhost:3000/image");
      const image: ImageGetReq[] = res.data;
      setImage(image);
    };
    loadDataAsync();
  }, []);

  return (
    <>
      <TextField type="file" size="small" onChange={selectFile} />
      <Button variant="contained" onClick={upload}>
        Upload File
      </Button>

      <div style={{border: "1px solid red"}}>
        {img?.map((item) => (
          <img width={"100%"} src={item.path} alt="" key={item.mid} />
        ))}
      </div>

      {/* <div style={{border: "1px solid red", height: "300px"}}>

      </div>
      <img src="http://localhost:3000/uploads/1708933613493-1420.png" alt="" /> */}
    </>
  );

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setFile(event.target.files[0]);
      console.log(event.target.files[0].name);
    }
  }

  async function upload() {
    if (file) {
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
      const image: ImageGetReq[] = data.data;
      setImage(image);
      // console.log(data.data);
    }
  }
}

export default UploadPage;