import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import getDeals from "../api/getDeals";
import refresh from "../api/refresh";
import { useAsyncCallback } from "../hooks/useAsyncCallback";
import { CircularProgress } from "@mui/material";

const Main = () => {
  const [deals, setDeals] = useState<{ title: string }[]>([{ title: "" }]);
  const [asyncRequest, isLoading, error] = useAsyncCallback(async () => {
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
  });

  useEffect(() => {
    asyncRequest();
  }, []);

  return (
    <div className="deals-wrapper">
      {isLoading ? (
        <CircularProgress />
      ) : (
        deals.map((elem, index) => {
          return (
            <div key={index} className="deal">
              {elem.title}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Main;
