import React, { useEffect, useState } from 'react';
import axios from 'axios';

function formatLocalDateTime(localDateTime) {
  const [year, month, day, hours, minutes, seconds, milliseconds] = localDateTime;

  const formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return `${formattedDate} ${formattedTime}`;
}

const ViewCage = () => {
  const [data, setData] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [animalData, setAnimalData] = useState([]);
  const [unidentifiedAnimalData, setUnidentifiedAnimalData] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isCreateLogVisible, setIsCreateLogVisible] = useState(false);
  const [isCreateUnidentifiedAnimalLog, setIsCreateUnidentifiedAnimalLog] = useState(false);
  const [isViewLogVisible, setIsViewLogVisible] = useState(false);
  const [logData, setLogData] = useState({
    id: 0,
    type: 'health',
    shortDescription: '',
    animalId: 0,
  });
  const [logInfo, setLogInfo] = useState([]);

  useEffect(() => {
    const apiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${localStorage.getItem('email')}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const apiData = response.data;
        setData(apiData);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu GET đến API', error);
      });
  }, []);

  const getAnimalLog = (animalId) => {
    const apiLogUrl = `https://zouzoumanagement.xyz/api/v1/log/${animalId}`;

    axios
      .get(apiLogUrl)
      .then((response) => {
        const logData = response.data;
        setLogInfo(logData);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu GET đến API Log', error);
      });
  };

  const createAnimalLog = (animalId, logData) => {
    const apiLogUrl = `https://zouzoumanagement.xyz/api/v1/log/${animalId}`;

    axios
      .post(apiLogUrl, logData)
      .then((response) => {
        console.log('Log created successfully', response.data);
        setIsCreateLogVisible(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu POST đến API Log', error);
      });
  };
  const createUnidentifiedAnimalLog = (unidentifiedAnimalId, logData) => {
    const apiLogUrl = `https://zouzoumanagement.xyz/api/v3/log/${unidentifiedAnimalId}`;

    axios
      .post(apiLogUrl, logData)
      .then((response) => {
        console.log('Log created successfully', response.data);
        setIsCreateLogVisible(false);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu POST đến API Log', error);
      });
  };

  const handleHideTable = () => {
    setSelectedCage(null);
    setAnimalData([]);
    setIsTableVisible(false);
  };

  const handleHideTable2 = () => {
    setSelectedCage(null);
    setUnidentifiedAnimalData([]);
    setIsTableVisible(false);
  };

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setAnimalData([]);
    setUnidentifiedAnimalData([]);
    setIsTableVisible(true);
  };

  const handleViewAnimals = (cageId) => {
    handleViewAnimalsInCage(cageId);
    handleViewUnidentifiedAnimalsInCage(cageId);
  };
  const handleViewLog2 = (unidentifiedAnimalId) => {
    getUnidentifiedAnimalLog(unidentifiedAnimalId);
    setIsViewLogVisible(true);
  };

  const getUnidentifiedAnimalLog = (unidentifiedAnimalId) => {
    const apiLogUrl = `https://zouzoumanagement.xyz/api/v3/log/${unidentifiedAnimalId}`;

    axios
      .get(apiLogUrl)
      .then((response) => {
        const logData = response.data;
        setLogInfo(logData);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu GET đến API Log', error);
      });
  };

  const handleViewAnimalsInCage = (cageId) => {
    const apiAnimalsUrl = `https://zouzoumanagement.xyz/api/v4/animal/${cageId}`;

    axios
      .get(apiAnimalsUrl)
      .then((response) => {
        const animalData = response.data;
        setAnimalData(animalData);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu GET đến API Animal', error);
      });
  };

  const handleViewUnidentifiedAnimalsInCage = (cageId) => {
    const apiAnimalsUrl = `https://zouzoumanagement.xyz/api/v3/unidentified-animal/${cageId}`;

    axios
      .get(apiAnimalsUrl)
      .then((response) => {
        const unidentifiedAnimalData = response.data;
        setUnidentifiedAnimalData(unidentifiedAnimalData);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu GET đến API Animal', error);
      });
  };

  const handleCreateLog = (animalId) => {
    setLogData({
      ...logData,
      animalId,
    });
    setIsCreateLogVisible(true);
  };
  const handleCreateUnidentifiedAnimalLog = (unidentifiedAnimalId) => {
    setLogData({
      ...logData,
      unidentifiedAnimalId,
    });
    setIsCreateUnidentifiedAnimalLog(true);
  };

  const handleViewLog = (animalId) => {
    getAnimalLog(animalId);
    setIsViewLogVisible(true);
  };

  const handleCancelCreateLog = () => {
    setIsCreateLogVisible(false);

  };
  const handleCancelCreateLog2 = () => {
    setIsCreateUnidentifiedAnimalLog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const logDataToSend = {
      type: logData.type,
      shortDescription: logData.shortDescription,
    };

    createAnimalLog(logData.animalId, logDataToSend);
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();

    const logDataToSend2 = {
      type: logData.type,
      shortDescription: logData.shortDescription,
    };

    createUnidentifiedAnimalLog(logData.unidentifiedAnimalId, logDataToSend2);
    setIsCreateUnidentifiedAnimalLog(false);
  };

  return (
    <div>
      <h1>View Cage</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{cage.name}</td>
              <td>
                <button onClick={() => handleViewDetail(cage)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                  <i className="material-icons left">remove_red_eye</i> Xem chi tiết
                </button>
                <button onClick={() => handleViewAnimals(cage.id)} className="waves-effect waves-light btn">
                  <i className="material-icons left">pets</i> View Animals in Cage
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isTableVisible && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedCage.id}</p>
          <p>Name: {selectedCage.name}</p>
          <p>Quantity: {selectedCage.quantity}</p>
          <p>Cage Status: {selectedCage.cageStatus}</p>
          <p>Cage Type: {selectedCage.cageType}</p>
          <p>Area Name: {selectedCage.areaName}</p>
          <p>Staff Email: {selectedCage.staffEmail}</p>
        </div>
      )}

      {animalData.length > 0 && (
        <div>
          <h2>Animal Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>DEZ</th>
                <th>Gender</th>
                <th>Specie</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.dob}</td>
                  <td>{animal.dez}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.specie}</td>
                  <td>{animal.status}</td>
                  <td>
                    <button onClick={() => handleCreateLog(animal.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left">create</i> Create Log
                    </button>
                    <button onClick={() => handleViewLog(animal.id)} className="waves-effect waves-light btn">
                      <i className="material-icons left">list</i> View Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isCreateLogVisible && (
            <div>
              <h2>Create Log</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <h5>Choose Type:</h5>
                  <div className="choose-type-label">
                    <label>
                      <input
                        name="type"
                        type="radio"
                        value="health"
                        checked={logData.type === "health"}
                        onChange={handleChange}
                      />
                      <span>Health</span>
                    </label>
                    <label>
                      <input
                        name="type"
                        type="radio"
                        value="sick"
                        checked={logData.type === "sick"}
                        onChange={handleChange}
                      />
                      <span>Sick</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label>Short Description:</label>
                  <input type="text" name="shortDescription" value={logData.shortDescription} onChange={handleChange} placeholder="Enter short description" />
                </div>
                <div>
                  <label>Animal ID:</label>
                  <input type="text" name="animalId" value={logData.animalId} readOnly />
                </div>
                <button className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                  <i className="material-icons left " >create</i> Create Log
                </button>
                <button onClick={handleCancelCreateLog} className="waves-effect waves-light btn">
                  <i className="material-icons left">cancel</i> Cancel
                </button>
              </form>
            </div>
          )}
          {isViewLogVisible && (
            <div>
              <h2>View Log</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Date & Time</th>
                    <th>Short Description</th>
                    <th>Animal ID</th>
                  </tr>
                </thead>
                <tbody>
                  {logInfo.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.type}</td>
                      <td>{formatLocalDateTime(log.dateTime)}</td>
                      <td>{log.shortDescription}</td>
                      <td>{log.animalId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setIsViewLogVisible(false)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                <i className="material-icons left smaller">close</i> Close Log
              </button>

            </div>
          )}
          <button onClick={handleHideTable} className="waves-effect waves-light btn">
            <i className="material-icons left">close</i> Close
          </button>
        </div>
      )}

      {unidentifiedAnimalData.length > 0 && (
        <div>
          <h2>Unidentified Animal Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unidentifiedAnimalData.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.quantity}</td>
                  <td>
                    <button onClick={() => handleCreateUnidentifiedAnimalLog(animal.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left">create</i> Create Log
                    </button>
                    <button onClick={() => handleViewLog2(animal.id)} className="waves-effect waves-light btn">
                      <i className="material-icons left">list</i> View Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isCreateUnidentifiedAnimalLog && (
            <div>
              <h2>Create Log</h2>
              <form onSubmit={handleSubmit2}>
                <div className="input-field">
                  <h5>Choose Type:</h5>
                  <div className="choose-type-label">
                    <label>
                      <input
                        name="type"
                        type="radio"
                        value="health"
                        checked={logData.type === "health"}
                        onChange={handleChange}
                      />
                      <span>Health</span>
                    </label>
                    <label>
                      <input
                        name="type"
                        type="radio"
                        value="sick"
                        checked={logData.type === "sick"}
                        onChange={handleChange}
                      />
                      <span>Sick</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label>Short Description:</label>
                  <input type="text" name="shortDescription" value={logData.shortDescription} onChange={handleChange} placeholder="Enter short description" />
                </div>
                <div>
                  <label>Animal ID:</label>
                  <input type="text" name="animalId" value={logData.unidentifiedAnimalId} readOnly />
                </div>
                <button className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                  <i className="material-icons left " >create</i> Create Log
                </button>
                <button onClick={handleCancelCreateLog2} className="waves-effect waves-light btn">
                  <i className="material-icons left">cancel</i> Cancel
                </button>
              </form>
            </div>
          )}
          {isViewLogVisible && (
            <div>
              <h2>View Log</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Date & Time</th>
                    <th>Short Description</th>
                    <th>Animal ID</th>
                  </tr>
                </thead>
                <tbody>
                  {logInfo.map((log) => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.type}</td>
                      <td>{formatLocalDateTime(log.dateTime)}</td>
                      <td>{log.shortDescription}</td>
                      <td>{log.unidentifiedAnimalId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setIsViewLogVisible(false)} className="waves-effect waves-light btn">
                <i className="material-icons left smaller">close</i> Close Log
              </button>

            </div>
          )}
          <button onClick={handleHideTable2} className="waves-effect waves-light btn">
            <i className="material-icons left">close</i> Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewCage;
