import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const HOST: string = "http://localhost:3000/image";

export class ImageService {
  async getImages() {
    const response = await axios.get(HOST); 
    
    return response;
  }

  async rankImages() {
    const url = HOST + `/rank`;
    const response = await axios.get(url); 
    console.log(response);
    
    return response;
  }

  async insert(file: File, uid: string, name: string) {
    const body = {
      file: file,
      uid: uid,
      name: name
    };
    const url = HOST + `/upload`;
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }

  async random() {
    const url = HOST + `/random`;
    const response = await axios.get(url); 
    
    return response;
  }

  async getImagesByUid(uid: string) {
    const url = HOST + "/user/" + uid;
    const response = await axios.get(url);
    
    return response;
  }

  async delete(mid: string) {
    const url = HOST + "/" + mid;
    const response = await axios.delete(url);
    
    return response;
  }

  async vote(win:string, Wscore:string, lose:string, Lscore:string) {
    const url = `http://localhost:3000/vote/${win}/${Wscore}/${lose}/${Lscore}`;
    const response = await axios.post(url);
    
    return response;
  }
}