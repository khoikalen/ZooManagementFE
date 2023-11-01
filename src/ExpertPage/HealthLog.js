import axios from "axios";
import React, { useEffect, useState } from "react";

function formatLocalDateTime(localDateTime) {
  const [year, month, day, hours, minutes, seconds, milliseconds] = localDateTime;

  const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}

const HealthLog = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const API_URL = `https://zouzoumanagement.xyz/api/v2/log/${localStorage.getItem(
      "email"
    )}`;

    axios
      .get(API_URL)
      .then((response) => {
        const apiData = response.data.map((item) => ({
          ...item,
          localDateTime: formatLocalDateTime(item.localDateTime),
        }));

        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);
  return (
    <div>
      <h1>Health Log</h1>
      <table>
        <thead>
          <th>Name</th>
          <th>Specie</th>
          <th>Short Description</th>
          <th>Date Time</th>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.species}</td>
              <td>{item.shortDescription}</td>
              <td>{item.localDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthLog;
