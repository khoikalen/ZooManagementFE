import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/expert';

const ExpertManager = () => {
  const [expertData, setExpertData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newExpert, setNewExpert] = useState(
    {
      firstName: '',
      lastName: '',
      gender: '', 
      startDay: '',
      email: '',
      phoneNumber: '',
      areaName: '',
      password: '',
    }
  );

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setExpertData(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải :', error);
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };
  const startEditing = (expertId) => {
    setEditingId(expertId);
  };
  const handleDeleteClick = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedExpertData = expertData.filter((expert) => expert.id !== id);
        setExpertData(updatedExpertData);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa :', error);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddExpert = () => {
    axios.post(API_URL, newExpert)
      .then((response) => {
        setExpertData([...expertData, response.data]);
        setAdding(false);
        setNewExpert( {
          firstName: '',
          lastName: '',
          gender: '', 
          startDay: '',
          email: '',
          phoneNumber: '',
          areaName: '',
          password: '',
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi add:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpert({
      ...newExpert,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const expertToUpdate = expertData.find((expert) => expert.id === id);
    const updatedFirstName = expertData.firstName;
    const updatedLastName = expertData.lastName;
    const updatedGender = expertData.gender; 
    const updatedStartDay = expertData.startDay;
    const updatedEmail = expertData.email;
    const updatedPhoneNumber = expertData.phoneNumber;
    const updatedAreaName = expertData.areaName;
    const updatedPassword = expertData.password;

    axios.put(`${API_URL}/${id}`, {
      firstName: updatedFirstName,
      lastName: updatedLastName,
      gender: updatedGender, 
      startDay: updatedStartDay,
      email: updatedEmail,
      phoneNumber: updatedPhoneNumber,
      areaName: updatedAreaName,
      password: updatedPassword,
    })
      .then(() => {
        const updatedExpertData = expertData.map((expert) => {
          if (expert.id === id) {
            return {
              ...expert,
              firstName: updatedFirstName,
              lastName: updatedLastName,
              gender: updatedGender, 
              startDay: updatedStartDay,
              email: updatedEmail,
              phoneNumber: updatedPhoneNumber,
              areaName: updatedAreaName,
              password: updatedPassword,
            };
          }
          return expert;
        });
        setExpertData(updatedExpertData);
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Lỗi khi update:', error);
      });
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th> 
            <th>Start Day</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Area Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertData.map((expert) => (
            <tr key={expert.id}>
               {/* <td>{expert.id === editingId ? <input type="text" name="lastName" value={newExpert.lastName} onChange={handleInputChange} /> : expert.lastName}</td>
              <td>{expert.id === editingId ? <input type="text" name="gender" value={newExpert.gender} onChange={handleInputChange} /> : expert.gender}</td> 
              <td>{expert.id === editingId ? <input type="text" name="startDay" value={newExpert.startDay} onChange={handleInputChange} /> : expert.startDay}</td>
              <td>{expert.id === editingId ? <input type="text" name="email" value={newExpert.email} onChange={handleInputChange} /> : expert.email}</td>
              <td>{expert.id === editingId ? <input type="text" name="phoneNumber" value={newExpert.phoneNumber} onChange={handleInputChange} /> : expert.phoneNumber}</td>
              <td>{expert.id === editingId ? <input type="text" name="areaName" value={newExpert.areaName} onChange={handleInputChange} /> : expert.areaName}</td> */}
              {/* <td>{expert.id === editingId ? <input type="text" name="firstName" value={newExpert.firstName} onChange={handleInputChange} /> : expert.firstName}</td> */}
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="firstName"
                    value={expert.firstName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.firstName);
                      if (index !== -1) {
                        newExpertdata[index].firstName = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.firstName}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="lastName"
                    value={expert.lastName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.lastName);
                      if (index !== -1) {
                        newExpertdata[index].lastName = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.lastName}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="gender"
                    value={expert.gender}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.gender);
                      if (index !== -1) {
                        newExpertdata[index].gender = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.gender}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="startDay"
                    value={expert.startDay}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id ===expert.startDay);
                      if (index !== -1) {
                        newExpertdata[index].startDay = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.startDay}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="email"
                    value={expert.email}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.email);
                      if (index !== -1) {
                        newExpertdata[index].email = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.email}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={expert.phoneNumber}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id ===expert.phoneNumber);
                      if (index !== -1) {
                        newExpertdata[index].phoneNumber = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.phoneNumber}</div>
                )}
              </td>
             
              <td>
                {editingId === expert.id ? (
                  <input
                    type="text"
                    name="areaName"
                    value={expert.areaName}
                    onChange={(e) => {
                      const newExpertdata = [...expertData];
                      const index = newExpertdata.findIndex((i) => i.id === expert.areaName);
                      if (index !== -1) {
                        newExpertdata[index].areaName = e.target.value;
                        setExpertData(newExpert);
                      }
                    }}
                  />
                ) : (
                  <div onClick={() => startEditing(expert.id)}>{expert.areaName}</div>
                )}
              </td>
             
              <td>
                {expert.id === editingId ? (
                  <>
                    <button onClick={() => handleSaveClick(expert.id)}>Save</button>
                    |
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(expert.id)}>Edit</button>
                    |
                    <button onClick={() => handleDeleteClick(expert.id)}>Delete</button>
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
      <h1>Expert Manager</h1>
      {adding ? (
        <div>
          <button onClick={() => setAdding(false)}>Cancel</button>
          <button onClick={handleAddExpert}>Add</button>
          <input type="text" placeholder="First Name" name="firstName" value={newExpert.firstName} onChange={handleInputChange} />
          <input type="text" placeholder="Last Name" name="lastName" value={newExpert.lastName} onChange={handleInputChange} />
          <input type="text" placeholder="Gender" name="gender" value={newExpert.gender} onChange={handleInputChange} /> {/* Change "Sex" to "Gender" */}
          <input type="text" placeholder="Start Day" name="startDay" value={newExpert.startDay} onChange={handleInputChange} />
          <input type="text" placeholder="Email" name="email" value={newExpert.email} onChange={handleInputChange} />
          <input type="text" placeholder="Phone Number" name="phoneNumber" value={newExpert.phoneNumber} onChange={handleInputChange} />
          <input type="text" placeholder="Area Name" name="areaName" value={newExpert.areaName} onChange={handleInputChange} />
          <input type="password" placeholder="Password" name="password" value={newExpert.password} onChange={handleInputChange} />
        </div>
      ) : (
        <>
          <button onClick={handleAddClick}>Add</button>
          {renderTable()}
        </>
      )}
    </div>
  );
};
export default ExpertManager;
