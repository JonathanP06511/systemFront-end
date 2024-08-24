import React, { useEffect} from 'react';

const Admindex = () => {
    

    useEffect(() => {
        
    }, []);

    return (
        <div className="admin-container">
            <section className="menu inicio">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="cart__total border-box">
                                <h2>Welcome</h2>
                                <br />
                                <h5>Type of user: Administrator</h5>
                                <br />
                                <a href="/Home" className="site-btn">Log out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Admindex;
