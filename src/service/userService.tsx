import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const HOST: string = "http://localhost:3000/user";

export class UserService {
  async getByUid(uid: string) {
    const url = HOST + "/" + uid;
    const response = await axios.get(url);
    
    return response;
  }

  async register(name: string, email: string, pass: string) {
    const url = HOST + "/register";
    const body = {
      email: email,
      password: pass,
      image: null,
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

  async update(uid: number, name: string, email: string, pass: string) {
    const url = HOST + "/update/" + uid;
    const body = {
      email: email,
      password: pass,
      name: name,
    };
    const response = await axios.post(url, body);
    return response;
  }

  async avatar(file: File, uid: string) {
    const url = HOST + "/avatar/" + uid;
    const body = {
      file: file,
    };
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  }
}
