import React, { useEffect, useState } from 'react';

const MedicalHistory = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchMedicalHistory = async () => {
        const item_valueid = sessionStorage.getItem("item_key"); 

        if (!item_valueid) {
            setError('Item ID not found in sessionStorage.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5020/history/${item_valueid}`);
            if (response.ok) {
                const data1 = await response.json();
                if (Array.isArray(data1)) {
                    setData(data1);
                } else {
                    setError('Unexpected response format');
                }
            } else if (response.status === 404) {
                setError('No medical history records found.');
            } else {
                throw new Error('Error fetching information');
            }
        } catch (error) {
            console.error(error.message);
            setError('Error fetching information');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchMedicalHistory();
    }, []);

    return (
        <div>
            <section className="admin-container">
                <div className="menu inicio">
                    <div className="container">
                        <div className='row'>
                            <div className="col-lg-4">
                                {data.length > 0 && (
                                    <div className="cart__total border-box">
                                        <h2>Medical History</h2>
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : error ? (
                                            <p>{error}</p>
                                        ) : (
                                            <div>
                                                {data.map(history => (
                                                    <ul key={history.idhistory}>
                                                        <li><strong>Date:</strong> {formatDate(history.consultation_date)}</li>
                                                        <li><strong>Blood Type:</strong> {history.blood_type}</li>
                                                        <li><strong>Known Diseases:</strong> {history.known_diseases}</li>
                                                        <li><strong>Allergies:</strong> {history.allergies}</li>
                                                        <li><strong>Treatment:</strong> {history.treatment}</li>
                                                    </ul>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {data.length === 0 && (
                                    <div className="no-history">
                                        <p>No medical history records available.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <br />
        </div>
    );
};

export default MedicalHistory;
