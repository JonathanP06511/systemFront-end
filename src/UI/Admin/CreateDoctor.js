import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admhalls = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:5005/apigetspecialties');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSpecialties(data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifyUrl = 'http://localhost:4001/apiverify'; 
      const verify = await fetch(`${verifyUrl}/${email}`);
      const mess = await verify.json();

      if (!verify.ok) {
        alert(mess);
      } else {
        const role = "doctor";
        const registerUrl = 'http://localhost:5006/apiregister'; 
        const response = await fetch(registerUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role, name, lastname, specialization, email, password, phone })
        });
        const message = await response.json();
        if (!response.ok) {
          throw new Error("Response Status: " + response.status);
        } else {
          alert(message);
          navigate('/Admin');
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container_register">
      <div className="form-container">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control small-input"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              className="form-control small-input"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              <option value="" disabled>Select</option>
              {specialties.map((specialty) => (
                <option key={specialty.id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control small-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control small-input"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              className="form-control small-input"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control small-input"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="site-btn" id="btn_registrar_cliente">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admhalls;
