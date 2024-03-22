import axios from "axios";

const HOST: string = "https://facecat-backend-v2.onrender.com/vote";

export class VoteService {
  async calScore(mid: string) {
    const url = HOST + `/score/${mid}`;
    const response = await axios.get(url);
    
    return response;
  }
}