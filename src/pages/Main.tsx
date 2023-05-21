import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [deals, setDeals] = useState<{ title: string }[]>([{ title: "" }]);
  const getDeals = async () => {
    await axios
      .get<{ data: [] }>("https://pipedrive-app.vercel.app/api/deals")
      .then((res) => {
        if (res.data.data) {
          console.log(res);
          return setDeals(res.data.data as unknown as { title: string }[]);
        }
      });
  };
  useEffect(() => {
    (async () => {
      await axios
        .get<{ access_token: string }>(
          "https://pipedrive-app.vercel.app/api/refresh"
        )
        .then((res) => {
          if (res.data) {
            console.log(res);
            return setAccessToken(res.data.access_token);
          }
        });
    })();
  }, []);
  return <div className="App">{accessToken}</div>;
};

export default Main;
