import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admrent = () => {
    const [specialtyName, setSpecialtyName] = useState('');
    const [specialtyDescription, setSpecialtyDescription] = useState('');
    const apiUrl = 'http://localhost:5004/apinewspecialty';

    const handleSubmit = async (event) => {
        event.preventDefault(); 
       
        const data = {
            name: specialtyName,
            description: specialtyDescription
        };

        console.log('Submitting data:', data);

        try {
            const resp = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`);
            }

           
            setSpecialtyName('');
            setSpecialtyDescription('');
            alert('Specialty successfully created');
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to submit data');
        }
    };

    return (
        <div>
            <section className="create-specialty">
                <h2>Create Medical Specialty</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="specialty_name">Specialty Name:</label>
                        <input 
                            type="text" 
                            id="specialty_name" 
                            name="specialty_name" 
                            value={specialtyName}
                            onChange={(e) => setSpecialtyName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specialty_description">Description:</label>
                        <textarea 
                            id="specialty_description" 
                            name="specialty_description" 
                            rows="4" 
                            value={specialtyDescription}
                            onChange={(e) => setSpecialtyDescription(e.target.value)}
                            required 
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="site-btn" id="btn_create_specialty">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Admrent;
