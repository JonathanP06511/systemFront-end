import React from 'react';
import logo2 from '../img/logo.png';
import '../../css/style.css';

const Usrfooter = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__logo">
                        <a href="/Home"><img src={logo2} alt="Logo" /></a>
                    </div>
                    <div className="footer__social">
                        <h6>Social Networks</h6>
                        <ul>
                            <li><a href="https://www.facebook.com/">Facebook</a></li>
                            <li><a href="https://www.instagram.com/">Instagram</a></li>
                            <li><a href="https://www.twitter.com/">Twitter</a></li>
                            <li><a href="https://www.linkedin.com/">LinkedIn</a></li>
                        </ul>
                    </div>
      
           
                    <div className="footer__contact">
                        <h6>Contact Us</h6>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: contact@hospitalplus.com</p>
                        <p>Address: 123 Health St, Wellness City</p>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p>©
                        <script>
                            document.write(new Date().getFullYear());
                        </script> All rights reserved | by <a href="https://www.hospitalplus.com" target="_blank" rel="noopener noreferrer">Hospital Plus</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Usrfooter;
