import axios from "axios";

const HOST: string = "http://localhost:3000/image";

export class ImageService {

  async random(uid: string) {
    const url = HOST + `/random/${uid}`;
    const response = await axios.get(url);
    console.log(response.data);
    
    return response;
  }
}