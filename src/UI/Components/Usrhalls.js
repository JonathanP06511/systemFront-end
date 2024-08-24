import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Usrhalls = () => {
    const [capacity, setCapacity] = useState('100');
    const [isMore, setIsMore] = useState(false);
    const [data, setData] = useState([]);
    const [data_type, setDataType] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`http://localhost:5000/apilisthalls/${data_type}/${capacity}`);
                if (resp.ok) {
                    let jsonData = await resp.json();
                    setData(jsonData);
                } else {
                    alert("Parameters not found");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [data_type, capacity]);

    const handleCapacityChange = (event) => {
        setIsMore(false);
        setCapacity(event.target.value);
    };

    const handleMoreChange = (event) => {
        setIsMore(event.target.checked);
        if (event.target.checked) {
            setCapacity('More');
        } else {
            setCapacity(300);
        }
    };

    return (
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Halls</h4>
                                <div>
                                    <Link to="/Home">Home &gt; </Link>
                                    <span>Halls</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p>Order to : &nbsp;&nbsp;</p>
                                        <select onChange={(event) => setDataType(event.target.value)}>
                                            <option value="All">All</option>
                                            <option value="Modern">Modern</option>
                                            <option value="Classic">Classic</option>
                                            <option value="Thematic">Thematic</option>
                                            <option value="Outdoor">Outdoor</option>
                                        </select>
                                        <br /><br />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="capacityRange">Max. Capacity: {isMore ? 'More' : capacity}</label>
                                        <input
                                            type="range"
                                            id="capacityRange"
                                            name="capacityRange"
                                            min="100"
                                            max="300"
                                            step="100"
                                            value={isMore ? 300 : capacity}
                                            onChange={handleCapacityChange}
                                            disabled={isMore}
                                        />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={isMore}
                                                onChange={handleMoreChange}
                                            />
                                            More
                                        </label>
                                    </div>
                                    <div className="col-lg-2">
                                        <div className="shop__product__option__right">
                                            <button className="site-btn" id="btn_add_car">SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row product__filter">
                                {data.filter(varid => varid).map(filname => (
                                    <div key={filname.ProId} className="col-lg-3 col-md-6 col-sm-6 mix new-arrivals">
                                        <div className="product__item">
                                            <div className="product__item__pic set-bg">
                                                <img style={{ width: 'auto', height: 275 }} src={`http://localhost:5000/images/${filname.ProImagen}`} alt={filname.ProNombre} />
                                                <span className="label">{filname.ProTipo}</span>

                                                <ul className="product__hover">
                                                    <li className="label2">{filname.ProColor}</li>
                                                    <li className="label2">{filname.ProPeso} Kg</li>
                                                    <li className="label2">{filname.ProModelo}</li>
                                                    <li className="label2">{filname.ProDimension}</li>
                                                </ul>
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{filname.ProNombre}</h6>
                                                <a href="/Login" className="add-cart">Ver detalles</a>
                                                <h5>${filname.ProPrecio}</h5>
                                                <div className="product__color__select">
                                                    {filname.ProDescripcion}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Usrhalls;
