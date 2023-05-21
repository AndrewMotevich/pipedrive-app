import axios, { AxiosResponse } from "axios";

const getDeals = async (token: string): Promise<AxiosResponse<{ data: [] }>> => {
  return await axios.get<{ data: [] }>(
    "https://example-sandbox.pipedrive.com/api/v1/deals",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default getDeals;
