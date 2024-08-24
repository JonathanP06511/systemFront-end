import React, { useEffect, useState, useCallback } from 'react';

const Clsindex = () => {
    const item_valueid = sessionStorage.getItem("item_key");
    const [data, setData] = useState(null); 
    const [dataA, setDataA] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const Information = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_GET_INFORMATION}/${item_valueid}`);
            const resp = await fetch(`${process.env.REACT_APP_GET_INFORMATION_ATENTION}/${item_valueid}`);

            if (response.ok) {
                const data1 = await response.json();
                if (typeof data1 === 'object' && data1 !== null && !Array.isArray(data1)) {
                    setData(data1); 
                } else {
                    setError('Unexpected response format');
                }
            } else if (response.status === 404) {
                setError('No information found.');
            } else {
                throw new Error('Error fetching information');
            }

            if (resp.ok) {
                const data2 = await resp.json();
                
                if (Array.isArray(data2)) {
                    setDataA(data2);
                } else {
                    setError('Unexpected response format');
                }
            }

        } catch (error) {
            console.error('Fetch error:', error.message);
            setError('Error fetching information');
        } finally {
            setLoading(false);
        }
    }, [item_valueid]);

    useEffect(() => {
        Information();
    }, [Information]);

    return (
        <div>
            <section className="admin-container">
                <div className="menu inicio">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card border-box">
                                    <h2>Welcome</h2>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p className="error">{error}</p>
                                    ) : data ? (
                                        <ul>
                                            <li id="txt_nom">{data.name + " " + data.lastname}</li>
                                            <li id="txt_correo">{data.mail}</li>
                                            <li id="txt_tipous">{data.role}</li>
                                            <li><a href="./Recpass"><i className="" aria-hidden="true"></i>Change password</a></li>
                                        </ul>
                                    ) : (
                                        <p>No information available.</p>
                                    )}
                                    <button id="btn_close" onClick={() => sessionStorage.setItem("item_rol", "")} className="site-btn">Log out</button>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="card border-box">
                                    <h2>Medical Appointments</h2>
                                     {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p className="error">{error}</p>
                                    ) : dataA.length > 0 ? (
                                        dataA.map(appointment => (
                                            <ul key={appointment.id}>
                                                <li id="last_reservations">Last Medical Appointments:</li>
                                                <li id="date_reservation">Date: {appointment.date}</li>
                                                <li id="name_hall">Specialty: {appointment.specialty}</li>
                                            </ul>
                                        ))
                                    ) : (
                                        <p>No medical appointments available.</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card border-box">
                                    <h2>Remember</h2>
                                </div>
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

export default Clsindex;
