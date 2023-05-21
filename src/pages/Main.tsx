import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import getDeals from "../api/getDeals";
import refresh from "../api/refresh";

const Main = () => {
  const [deals, setDeals] = useState<{ title: string }[]>([{ title: "" }]);

  useEffect(() => {
    (async () => {
      await refresh().then(async (token) => {
        if (token != undefined) {
          await getDeals(token).then((res) => {
            if (res.data.data) {
              console.log(res);
              return setDeals(res.data.data as unknown as { title: string }[]);
            }
          });
        }
      });
    })();
  }, []);

  return (
    <div className="deals-wrapper">
      {deals.map((elem, index) => {
        return (
          <div key={index} className="deal">
            {elem.title}
          </div>
        );
      })}
    </div>
  );
};

export default Main;
