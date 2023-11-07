import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CageTable = () => {
  const [animalData, setAnimalData] = useState([]);
  const [unidentifiedAnimalData, setUnidentifiedAnimalData] = useState([]);
  const [activeTab, setActiveTab] = useState('animal');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [selectedUnidentifiedAnimal, setSelectedUnidentifiedAnimal] = useState(null);
  const [cageData, setCageData] = useState([]);
  const [showCageInfo, setShowCageInfo] = useState(false);
  const [selectedCageId, setSelectedCageId] = useState(null);
  const [selectedCageName, setSelectedCageName] = useState(null);
  const [confirmMove, setConfirmMove] = useState(false);
  const [cageMoveTo, setCageMoveTo] = useState(null);

  useEffect(() => {
    const animalApiUrl = `https://zouzoumanagement.xyz/api/v6/animal/${localStorage.getItem("email")}`;
    axios.get(animalApiUrl)
      .then((response) => {
        const animalData = response.data;
        setAnimalData(animalData);
      })
      .catch((error) => {
        console.error("Error when sending a GET request to Animal API", error);
      });

    const unidentifiedAnimalApiUrl = `https://zouzoumanagement.xyz/api/v4/unidentified-animal/${localStorage.getItem("email")}`;
    axios.get(unidentifiedAnimalApiUrl)
      .then((response) => {
        const unidentifiedAnimalData = response.data;
        setUnidentifiedAnimalData(unidentifiedAnimalData);
      })
      .catch((error) => {
        console.error("Error when sending a GET request to Unidentified Animal API", error);
      });
  }, []);

  const handleChooseCage = (cageId) => {
    const selectedCage = cageData.find((cage) => cage.id === cageId);

    if (selectedCage) {
      setSelectedCageId(selectedCage.id);
      setSelectedCageName(selectedCage.name);
      setCageMoveTo(selectedCage.id);
    }
  };

  const handleMoveCage = (animal) => {
    setSelectedAnimal(animal);
    const staffEmail = localStorage.getItem("email");
    const cageApiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${staffEmail}`;
    axios.get(cageApiUrl)
      .then((response) => {
        const cageData = response.data;
        setCageData(cageData);
        setShowCageInfo(true);
      })
      .catch((error) => {
        console.error("Error when sending a GET request to Cage API", error);
      });
  };

  const handleMoveUnidentifiedAnimal = (unidentifiedAnimal) => {
    setSelectedUnidentifiedAnimal(unidentifiedAnimal);
    const staffEmail = localStorage.getItem("email");
    const cageApiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${staffEmail}`;
    axios.get(cageApiUrl)
      .then((response) => {
        const cageData = response.data;
        setCageData(cageData);
        setShowCageInfo(true);
      })
      .catch((error) => {
        console.error("Error when sending a GET request to Cage API", error);
      });
  };

  const handleConfirmMove = () => {
    setConfirmMove(true);
  };

  const handleFinalMove = () => {
    if (selectedAnimal && selectedCageId && selectedCageName) {
      const animalID = selectedAnimal.id;
      const animalMoveApiUrl = `https://zouzoumanagement.xyz/api/v2/animal/${animalID}`;
      const data = {
        cageID: selectedCageId,
        cageName: selectedCageName,
      };
      axios.put(animalMoveApiUrl, data)
        .then((response) => {
          console.log("Animal moved successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error when sending a PUT request to Animal API", error);
        });
    } else if (selectedUnidentifiedAnimal && selectedCageId && selectedCageName) {
      const unidentifiedAnimalID = selectedUnidentifiedAnimal.id;
      const unidentifiedAnimalMoveApiUrl = `https://zouzoumanagement.xyz/api/v2/unidentified-animal/${unidentifiedAnimalID}`;
      const data = {
        cageID: selectedCageId,
        cageName: selectedCageName,
      };
      axios.put(unidentifiedAnimalMoveApiUrl, data)
        .then((response) => {
          console.log("Unidentified animal moved successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error when sending a PUT request to Unidentified Animal API", error);
        });
    }
  };

  return (
    <div>
      <h1>Thông Tin Động Vật</h1>
      <div className="tabs">
        <button
          className={`btn ${activeTab === 'animal' ? 'waves-effect waves-light' : ''}`}
          onClick={() => setActiveTab('animal')}
          style={{ marginRight: '10px' }}
        >
          Động Vật
        </button>
        <button
          className={`btn ${activeTab === 'unidentifiedAnimal' ? 'waves-effect waves-light' : ''}`}
          onClick={() => setActiveTab('unidentifiedAnimal')}
        >
          Động Vật Không Xác Định
        </button>
      </div>
      {activeTab === 'animal' && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Dez</th>
                <th>Gender</th>
                <th>Specie</th>
                <th>Status</th>
                <th>Cage ID</th>
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
                  <td>{animal.cageId}</td>
                  <td>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => handleMoveCage(animal)}
                    >
                      Move Cage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'unidentifiedAnimal' && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Cage Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unidentifiedAnimalData.map((unidentifiedAnimal) => (
                <tr key={unidentifiedAnimal.id}>
                  <td>{unidentifiedAnimal.id}</td>
                  <td>{unidentifiedAnimal.name}</td>
                  <td>{unidentifiedAnimal.quantity ? unidentifiedAnimal.quantity : '-'}</td>
                  <td>{unidentifiedAnimal.cageId}</td>
                  <td>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => handleMoveUnidentifiedAnimal(unidentifiedAnimal)}
                    >
                      Move Cage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showCageInfo && (
        <div>
          <h2>Thông Tin Lồng (ID Thú: {selectedAnimal ? selectedAnimal.id : selectedUnidentifiedAnimal ? selectedUnidentifiedAnimal.id : 'N/A'})</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Cage Status</th>
                <th>Cage Type</th>
                <th>Area Name</th>
                <th>Choose Cage</th>
              </tr>
            </thead>
            <tbody>
              {cageData.map((cage) => (
                <tr key={cage.id}>
                  <td>{cage.id}</td>
                  <td>{cage.name}</td>
                  <td>{cage.quantity}</td>
                  <td>{cage.cageStatus}</td>
                  <td>{cage.cageType}</td>
                  <td>{cage.areaName}</td>
                  <td>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => handleChooseCage(cage.id)}
                    >
                      Choose
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedCageId && selectedCageName && !confirmMove && (
        <div>
          <p>Selected Cage ID: {selectedCageId}</p>
          <p>Selected Cage Name: {selectedCageName}</p>
          <button
            className="btn waves-effect waves-light"
            onClick={handleConfirmMove}
          >
            Confirm to Move
          </button>
        </div>
      )}
      {confirmMove && (
        <div>
          <p>Confirm the move from cage ID: {selectedAnimal ? selectedAnimal.cageId : selectedUnidentifiedAnimal ? selectedUnidentifiedAnimal.cageId : 'N/A'} to cage ID: {selectedCageId} {selectedCageName}</p>
          <button
            className="btn waves-effect waves-light"
            onClick={handleFinalMove}
          >
            Move it
          </button>
        </div>
      )}
    </div>
  );
};

export default CageTable;
