import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddAnimal = () => {
    const [cageData, setCageData] = useState([]);
    const [selectedCage, setSelectedCage] = useState(null);
    const [animalData, setAnimalData] = useState([]);
    const [isViewLogVisible, setIsViewLogVisible] = useState(false);
    const [animalFormData, setAnimalFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        status: '',
        specie: '',
    });
    const [newAnimalAdded, setNewAnimalAdded] = useState(false);
    const [addAnimalError, setAddAnimalError] = useState(null);
    const [newAnimalData, setNewAnimalData] = useState({
        name: '',
        quantity: '',
    });
    const [newUnidentifiedAnimalAdded, setNewUnidentifiedAnimalAdded] = useState(false);
    const [addUnidentifiedAnimalError, setAddUnidentifiedAnimalError] = useState(null);

    useEffect(() => {
        const apiUrl = `https://zouzoumanagement.xyz/api/v3/cage/${localStorage.getItem("email")}`;

        axios.get(apiUrl)
            .then((response) => {
                const cageData = response.data;
                setCageData(cageData);
            })
            .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu GET đến API", error);
            });
    }, []);

    const handleViewDetail = (cage) => {
        setSelectedCage(cage);
        setAnimalData([]);
        setNewAnimalAdded(false);
        setAddAnimalError(null);
    };

    const handleAddAnimal = () => {
        const cageId = selectedCage ? selectedCage.id : null;

        if (cageId) {
            const animalApiUrl = `https://zouzoumanagement.xyz/api/v1/animal/${cageId}`;

            const newAnimalData = {
                ...animalFormData,
                cageId: cageId,
            };

            axios.post(animalApiUrl, newAnimalData)
                .then((response) => {
                    setNewAnimalAdded(true);
                    setAnimalFormData({
                        name: '',
                        dob: '',
                        gender: '',
                        status: '',
                        specie: '',
                    });
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi yêu cầu POST đến API", error);
                    setAddAnimalError("Không thể thêm Animal. Vui lòng kiểm tra thông tin và thử lại.");
                });
        }
    };

    const handleAddUnidentifiedAnimal = () => {
        const cageId = selectedCage ? selectedCage.id : null;

        if (cageId) {
            const unidentifiedAnimalApiUrl = `https://zouzoumanagement.xyz/api/v1/unidentified-animal/${cageId}`;

            const newUnidentifiedAnimalData = {
                ...newAnimalData,
                cageId: cageId,
            };

            axios.post(unidentifiedAnimalApiUrl, newUnidentifiedAnimalData)
                .then((response) => {
                    setNewUnidentifiedAnimalAdded(true);
                    setNewAnimalData({
                        name: '',
                        quantity: '',
                    });
                })
                .catch((error) => {
                    console.error("Lỗi khi gửi yêu cầu POST đến API", error);
                    setAddUnidentifiedAnimalError("Không thể thêm Unidentified Animal. Vui lòng kiểm tra thông tin và thử lại.");
                });
        }
    };

    return (
        <div>
            <h1>Thông Tin Khu Chuồng</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cageData.map((cage) => (
                        <tr key={cage.id}>
                            <td>{cage.id}</td>
                            <td>{cage.name}</td>
                            <td>
                                <button onClick={() => handleViewDetail(cage)} className="btn waves-effect" style={{ marginRight: '10px' }}>
                                    <i className="material-icons left small">visibility</i>Xem chi tiết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCage && (
                <div>
                    <h2>Chi tiết</h2>
                    <p>ID: {selectedCage.id}</p>
                    <p>Name: {selectedCage.name}</p>
                    <p>Quantity: {selectedCage.quantity}</p>
                    <p>Cage Status: {selectedCage.cageStatus}</p>
                    <p>Cage Type: {selectedCage.cageType}</p>
                    <p>Area Name: {selectedCage.areaName}</p>
                    <p>Staff Email: {selectedCage.staffEmail}</p>
                    {selectedCage.cageType === 'Open' ? (
                        <div>
                            <h2>Thêm Unidentified Animal</h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newAnimalData.name}
                                    onChange={(e) => setNewAnimalData({ ...newAnimalData, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Quantity"
                                    value={newAnimalData.quantity}
                                    onChange={(e) => setNewAnimalData({ ...newAnimalData, quantity: e.target.value })}
                                />
                                <button onClick={handleAddUnidentifiedAnimal}>Thêm Unidentified Animal</button>
                                {newUnidentifiedAnimalAdded && <p style={{ color: 'green' }}>Thêm Unidentified Animal thành công!</p>}
                                {addUnidentifiedAnimalError && <p style={{ color: 'red' }}>{addUnidentifiedAnimalError}</p>}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h2>Thêm Animal</h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={animalFormData.name}
                                    onChange={(e) => setAnimalFormData({ ...animalFormData, name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Date of Birth"
                                    value={animalFormData.dob}
                                    onChange={(e) => setAnimalFormData({ ...animalFormData, dob: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Gender"
                                    value={animalFormData.gender}
                                    onChange={(e) => setAnimalFormData({ ...animalFormData, gender: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Status"
                                    value={animalFormData.status}
                                    onChange={(e) => setAnimalFormData({ ...animalFormData, status: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Specie"
                                    value={animalFormData.specie}
                                    onChange={(e) => setAnimalFormData({ ...animalFormData, specie: e.target.value })}
                                />
                                <button onClick={handleAddAnimal}>Thêm Animal</button>
                                {newAnimalAdded && <p style={{ color: 'green' }}>Thêm Animal thành công!</p>}
                                {addAnimalError && <p style={{ color: 'red' }}>{addAnimalError}</p>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddAnimal;
