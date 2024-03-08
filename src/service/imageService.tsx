import axios from "axios";

const HOST: string = "http://localhost:3000/image";

export class ImageService {
  async getImages() {
    const response = await axios.get(HOST); 
    console.log(response.data);
    
    return response;
  }

  async random() {
    const url = HOST + `/random`;
    const response = await axios.get(url); 
    return response;
  }
}