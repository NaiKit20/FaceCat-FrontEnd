import axios from "axios";

const HOST: string = "http://localhost:3000/user";

export class UserService {

  async register(name: string, email: string, pass: string) {
    const url = HOST + "/register";
    const body = {
        email: email,
        password: pass,
        image: "",
        type: 0,
        name: name,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async login(email: string, pass: string) {
    const url = HOST + "/login";
    const body = {
        email: email,
        password: pass,
    };
    const response = await axios.post(url, body);
    return response;
  }
}