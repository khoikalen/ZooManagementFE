import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/cage';

const Cage = () => {
  const [cageData, setCageData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newCage, setNewCage] = useState({
    id: '',
    name: '',
    quantity: '',
    cageStatus: '',
    cageType: '',
    areaName: '',
    staffEmail: '',
  });

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        const cageDataWithDefaultRole = response.data.map((cage) => ({
          ...cage,
        }));
        setCageData(cageDataWithDefaultRole);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu chuồng:', error);
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };
  const startEditing = (cageId) => {
    setEditingId(cageId);
  };
  const handleDeleteClick = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedCageData = cageData.filter((cage) => cage.id !== id);
        setCageData(updatedCageData);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa chuồng:', error);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddCage = () => {
    axios.post(API_URL, newCage)
      .then(() => {
        setNewCage({
          name: '',
          cageStatus: '',
          cageType: '',
          areaName: '',
          staffEmail: '',
        });


        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi thêm chuồng:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCage({
      ...newCage,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const cageToUpdate = cageData.find((cage) => cage.id === id);
    const updatedCageStatus = cageToUpdate.cageStatus;
    const updatedStaffEmail = cageToUpdate.staffEmail;
    const updatedName = cageToUpdate.name;

    axios.put(`${API_URL}/${id}`, {
      cageName: updatedName,
      cageStatus: updatedCageStatus,
      staffEmail: updatedStaffEmail,
    })
      .then(() => {
        const updatedCageData = cageData.map((cage) => {
          if (cage.id === id) {
            return {
              ...cage,
              cageName: updatedName,
              cageStatus: updatedCageStatus,
              staffEmail: updatedStaffEmail,
            };
          }
          return cage;
        });
        setCageData(updatedCageData);
        setEditingId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật chuồng:', error);
      });
  };


  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cage Status</th>
            <th>Cage Type</th>
            <th>Area Name</th>
            <th>Staff Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cageData.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>
                {editingId === cage.id ? (
                  <input
                    type="text"
                    name='cageName'
                    value={cage.name}
                    onChange={(e) => {
                      const newCage = [...cageData];
                      const index = newCage.findIndex((i) => i.id === cage.id);
                      if (index !== -1) {
                        newCage[index].name = e.target.value;
                        setCageData(newCage);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(cage.id)}>{cage.name}</div>
                )}
              </td>
              <td>{cage.quantity}</td>
              <td>
                {editingId === cage.id ? (
                  <input
                    type="text"
                    name="cageStatus"
                    value={cage.cageStatus}
                    onChange={(e) => {
                      const newCage = [...cageData];
                      const index = newCage.findIndex((i) => i.id === cage.id);
                      if (index !== -1) {
                        newCage[index].cageStatus = e.target.value;
                        setCageData(newCage);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(cage.id)}>{cage.cageStatus}</div>
                )}
              </td>
              <td>{cage.cageType}</td>
              <td>{cage.areaName}</td>
              <td>
                {editingId === cage.id ? (
                  <input
                    type="text"
                    name="staffEmail"
                    value={cage.staffEmail}
                    onChange={(e) => {
                      const newCage = [...cageData];
                      const index = newCage.findIndex((i) => i.id === cage.id);
                      if (index !== -1) {
                        newCage[index].staffEmail = e.target.value;
                        setCageData(newCage);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(cage.id)}>{cage.staffEmail}</div>
                )}
              </td>
              <td>
                {editingId === cage.id ? (
                  <>
                    <button onClick={() => handleSaveClick(cage.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">save</i>
                    </button>
                    <button onClick={handleCancelClick} className="waves-effect waves-light btn">
                      <i className="material-icons left small">cancel</i>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(cage.id)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
                      <i className="material-icons left small">edit</i>
                    </button>
                    <button onClick={() => handleDeleteClick(cage.id)} className="waves-effect waves-light btn">
                      <i className="material-icons left small">delete</i>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Cage</h1>
      {adding ? (
        <div>
          <button onClick={() => setAdding(false)} className="waves-effect waves-light btn" style={{ marginRight: '10px' }}>
            <i className="material-icons left">cancel</i>Cancel
          </button>
          <button onClick={handleAddCage} className="waves-effect waves-light btn">
            <i className="material-icons left">add</i>Add
          </button>
          <input type="text" placeholder="Name" name="cageName" value={newCage.cageName} onChange={handleInputChange} />
          <input type="text" placeholder="Staff Email" name="staffEmail" value={newCage.staffEmail} onChange={handleInputChange} />
          <select
            name="cageStatus"
            value={newCage.cageStatus}
            onChange={handleInputChange}
          >
            <option value="">Select Cage Status</option>
            <option value="Owned">Owned</option>
            <option value="Empty">Empty</option>
          </select>

          <select
            name="cageType"
            value={newCage.cageType}
            onChange={handleInputChange}
          >
            <option value="">Select Cage Type</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>

          </select>

          <select
            name="areaName"
            value={newCage.areaName}
            onChange={handleInputChange}
          >
            <option value="">Select Area Name</option>
            <option value="Carnivore area">Carnivore area</option>
            <option value="Herbivore area">Herbivore area</option>
            <option value="Reptile area">Reptile area</option>
            <option value="Bird area">Bird area</option>
            <option value="Primate and omnivore area">Primate and omnivore area</option>
          </select>

         
        </div>
      ) : (
        <>
          <button className="waves-effect waves-light btn add-button" onClick={handleAddClick} style={{ marginRight: '10px' }}>
            <i className="material-icons left">add</i>Add
          </button>
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default Cage;
