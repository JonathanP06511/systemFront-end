import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Usrheader from './UI/Components/Usrheader';
import Usrindex from './UI/Components/Usrindex';
import Usrfooter from './UI/Components/Usrfooter';
import Usrhalls from './UI/Components/Usrhalls';
import Usrregister from './UI/Components/Usrregister';
import Usrlogin from './UI/Components/UsrLogin';
import About from './UI/Components/AboutUs';
import DocLogin from './UI/Components/DocLogin';

// Clients
import Clsindex from './UI/Client/Clsindex';
import Clsheader from './UI/Client/Clsheader';
import Appointments from './UI/Client/Appointments';
import History from './UI/Client/History';

// Admin
import Admheader from './UI/Admin/Admheader';
import Admindex from './UI/Admin/Admindex';
import CreateDoctor from './UI/Admin/CreateDoctor';
import CreateSpecialty from './UI/Admin/CreateSpecialty';

//Doctor
import Docindex from './UI/Doctor/Docindex'
import Docheader from './UI/Doctor/Docheader'
import DocAppointments from './UI/Doctor/DocAppointments';
import DocHistory from './UI/Doctor/DocHistory';

function App() {
  var item_varRoll = sessionStorage.getItem("item_rol");

  const Doctor = () =>{
    return <Router>
      <div>
        <Routes>
          <Route path="/Doctor" element={<><Docheader /><Docindex /></>} />
          <Route path="/DocAppoinments" element={<><Docheader /><DocAppointments /></>} />
          <Route path="/DocHistory" element={<><Docheader /><DocHistory /></>} />
        </Routes>
      </div>
    </Router>
  }

  const Client = () => {
    return <Router>
      <div>  
        <Routes>
          <Route path="/Client" element={<><Clsheader /><Clsindex /></>} />
          <Route path="/Appointments" element={<><Clsheader /><Appointments /></>} />
          <Route path="/History" element={<><Clsheader /><History /></>} />
        </Routes>
      </div>
    </Router>
  }

  const Admin = () => {
    return <Router>
      <div>
        <Routes>
          <Route path="/Admin" element={<><Admheader /><Admindex /></>} />
          <Route path="/CreateDoctor" element={<><Admheader /><CreateDoctor /></>} />
          <Route path="/CreateSpecialty" element={<><Admheader /><CreateSpecialty /></>} />
        </Routes>
      </div>
    </Router>
  }

  const User = () => {
    return <Router>
      <div>
        
        <Routes>
          <Route path="/Home" element={<><Usrheader/><Usrindex /></>} />
          <Route exact path="/" element={<><Usrheader/><Usrindex /></>} />
          <Route exact path="/Halls" element={<><Usrheader/><Usrhalls /></>} />
          <Route exact path="/Register" element={<><Usrheader/><Usrregister /></>} />
          <Route exact path="/Login" element={<><Usrheader/><Usrlogin /></>} />
          <Route exact path="/About" element={<><Usrheader/><About /></>} />
          <Route exact path="/DocLogin" element={<><Usrheader/><DocLogin /></>} />           
        </Routes>
      </div>
    </Router>
  }

  return (
    <>
      {item_varRoll === "admin" ? <Admin /> : item_varRoll === "client" ? <Client /> : item_varRoll === "doctor" ? <Doctor /> : null}
      <User />
      <Usrfooter /> 
    </>
  );
}

export default App;
