import axios from "axios";

const ENDPOINT = `https://www.boredapi.com/api/activity`;

export async function getActivity(Numberparticipants) {

    try {
        const result = await axios({
          method: "GET",
          url: `${ENDPOINT}/?participants=${Numberparticipants}`,
          headers: {
            "Content-type": "application/json",
          },
        });
        return result.data;
      } catch (error) {
        throw error.response.data;
      }

}