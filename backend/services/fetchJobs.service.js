import axios from "axios";
import { parseStringPromise } from "xml2js";

// Step 1: Fetch jobs data from external RSS API
export const fetchJobsFromAPI = async (url) => {

  // Step 2: Make HTTP GET request to fetch XML response
  const response = await axios.get(url);

  // Step 3: Convert XML response into JSON
  const json = await parseStringPromise(response.data, { explicitArray: false, strict: false });

  
  return json;
};
