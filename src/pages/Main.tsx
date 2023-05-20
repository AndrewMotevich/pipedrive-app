import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const Main = () => {
  const [deals, setDeals] = useState<{ title: string }[]>([{ title: "" }]);
  useEffect(() => {
    (async () => {
      await axios
        .get<object[]>("https://pipedrive-app.vercel.app/api/deals")
        .then((res) => {
          if (res.data) {
            console.log(res);
            return setDeals(res.data as unknown as { title: string }[]);
          }
        });
    })();
  }, []);
  return <div className="App">{deals[0].title}</div>;
};

export default Main;
