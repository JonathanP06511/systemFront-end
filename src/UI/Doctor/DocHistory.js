import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateMedicalHistory = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [consultationDate, setConsultationDate] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [knownDiseases, setKnownDiseases] = useState('');
    const [allergies, setAllergies] = useState('');
    const [treatment, setTreatment] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_GET_USERS_URL);
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            users_id: selectedUserId,
            consultation_date: consultationDate,
            blood_type: bloodType,
            known_diseases: knownDiseases,
            allergies: allergies,
            treatment: treatment
        };

        console.log('Submitting data:', data);

        try {
            const response = await fetch(process.env.REACT_APP_API_CREATE_HISTORY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setSelectedUserId('');
            setConsultationDate('');
            setBloodType('');
            setKnownDiseases('');
            setAllergies('');
            setTreatment('');
            alert('Medical history record successfully created');
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
                <h2 className="text-center mb-4">Create Medical History Record</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="users_id">User:</label>
                        <select 
                            id="users_id" 
                            name="users_id" 
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            required 
                            className="form-control"
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.idusers} value={user.idusers}>
                                    {user.name} {user.lastname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="consultation_date">Consultation Date:</label>
                        <input 
                            type="date" 
                            id="consultation_date" 
                            name="consultation_date" 
                            value={consultationDate}
                            onChange={(e) => setConsultationDate(e.target.value)}
                            required 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blood_type">Blood Type:</label>
                        <input 
                            type="text" 
                            id="blood_type" 
                            name="blood_type" 
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)} 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="known_diseases">Known Diseases:</label>
                        <textarea 
                            id="known_diseases" 
                            name="known_diseases" 
                            rows="2" 
                            value={knownDiseases}
                            onChange={(e) => setKnownDiseases(e.target.value)} 
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="allergies">Allergies:</label>
                        <textarea 
                            id="allergies" 
                            name="allergies" 
                            rows="2" 
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)} 
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="treatment">Treatment:</label>
                        <textarea 
                            id="treatment" 
                            name="treatment" 
                            rows="2" 
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)} 
                            className="form-control"
                        ></textarea>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary" id="btn_create_history">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMedicalHistory;
