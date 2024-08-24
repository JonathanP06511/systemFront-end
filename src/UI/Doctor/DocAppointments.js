import React, { useEffect, useState } from 'react';

const DocAppointments = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const Information = async () => {
        try {
            const response = await fetch(`http://localhost:5012/apidataappointments`);
            if (response.ok) {
                const data1 = await response.json();
                if (Array.isArray(data1)) {
                    setData(data1);
                } else {
                    setError('Unexpected response format');
                }
            } else if (response.status === 404) {
                setError('No information found.');
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

    const handleApprove = () => {
        setData([]);
    };

    useEffect(() => {
        Information();
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
                                        <h2>Appointments</h2>
                                        {loading ? (
                                            <p>Loading...</p>
                                        ) : error ? (
                                            <p>{error}</p>
                                        ) : (
                                            <div>
                                                {data.map(appointment => (
                                                    <ul key={appointment.idappointments}>
                                                        <li><strong>Date:</strong> {appointment.date}</li>
                                                        <li><strong>Specialty:</strong> {appointment.specialty}</li>
                                                        <li><strong>Reason:</strong> {appointment.reason}</li>
                                                        <li>
                                                            <button id="btn_close" className="site-btn" onClick={handleApprove}>Approve</button>
                                                        </li>
                                                    </ul>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                {data.length === 0 && (
                                    <div className="no-appointments">
                                        <p>No appointments available.</p>
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

export default DocAppointments;
