import axios from "axios";

const refresh = async (): Promise<string> => {
  return await axios
    .get<{ access_token: string }>("https://pipedrive-app.vercel.app/api/refresh")
    .then(async (res) => {
      if (res.data) {
        return res.data.access_token;
      } else return "";
    });
};

export default refresh;
