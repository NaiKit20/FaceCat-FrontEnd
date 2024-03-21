import axios from "axios";

const HOST: string = "https://facecat-backend.onrender.com/vote";

export class VoteService {
  async calScore(mid: string) {
    const url = HOST + `/score/${mid}`;
    const response = await axios.get(url);
    
    return response;
  }
}