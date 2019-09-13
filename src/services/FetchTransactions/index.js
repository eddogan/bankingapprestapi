import axios from "axios";
// Custom imports
import { sortByDate } from "../../helpers/SortByDate";
import { getToday } from "../../helpers/FormatDates";

export default function fetchTransactions(
  searchType,
  order,
  startDate = getToday(),
  endDate = null,
  errorHandler,
  callback
) {
  const api = `${process.env.REACT_APP_API_URL}/api/clients/${sessionStorage.AccountId}/ClientTransactions?SearchType=${searchType}&startDate=${startDate}&endDate=${endDate}`;
  const axiosConfig = {
    method: "get",
    url: api,
    withCredentials: true,
    crossdomain: true,
    headers: {
      Authorization: `Bearer ${sessionStorage.access_token}`
    }
  };
  axios(axiosConfig)
    .then(response => {
      if (response.status === 200) {
        const data = sortByDate(order, response.data);
        callback(data);
      } else {
        throw new Error(`Error Code ${response.status}`);
      }
    })
    .catch(() => {
      errorHandler(true);
    });
}
