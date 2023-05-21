import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [deals, setDeals] = useState<{ title: string }[]>([{ title: "" }]);

  const getDeals = async (token: string) => {
    await axios
      .get<{ data: [] }>("https://example-sandbox.pipedrive.com/api/v1/deals", {
        headers: { Authorization: `Bearer ${token}` },
      })
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
        .then(async (res) => {
          if (res.data) {
            await setAccessToken(res.data.access_token);
            return res.data.access_token;
          }
        })
        .then(async (token) => {
          if (token != undefined) {
            await getDeals(token);
          }
        });
    })();
  }, []);

  return (
    <div className="deals-wrapper">
      {deals.map((elem, index) => {
        return (
          <div key={index} className="deals">
            {elem.title}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
