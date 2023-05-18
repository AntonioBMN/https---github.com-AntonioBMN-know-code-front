import axios from "axios";
import { mountRequest } from "../../utils/HomeUtils";

export const countOccourrences = async (object) => {
  const { files, words } = mountRequest(object);
  const response = await axios({
    url: `http://localhost:3000/verify_text?words=${words}`,
    method: "POST",
    data: files,
  });
  return response.data.message;
};
