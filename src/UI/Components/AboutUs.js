import React, { useState, useEffect } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import bn1 from '../img/index/BANNER-SALUD1.jpg';
import bn2 from '../img/index/BANNER-SALUD2.jpg';
import bn3 from '../img/index/BANNER-SALUD3.jpg';

const items = [
    { src: bn1 },
    { src: bn2 },
    { src: bn3 },
];

function Usrindex(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3012/api/images')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Images fetched:', data); 
                setImages(data);
            })
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => (
        <CarouselItem
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            key={item.src}
        >
            <img src={item.src} alt={item.altText} />
            <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
    ));

    return (
        <div>
            <Carousel activeIndex={activeIndex} next={next} previous={previous} {...args}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>

            <section className="latest spad">
                <div className="container">
                    <div className="section-title text-center">
                        <br></br>
                        <span className="text-uppercase text-danger">Building a Better Tomorrow</span>
                        <h2 className="text-uppercase">Mission</h2>
                        <p>Our mission is to provide exceptional, compassionate, and comprehensive medical care to all individuals...</p>
                        <br></br>
                        <h2 className="text-uppercase">Vision</h2>
                        <p>Our vision is to be a leading healthcare provider recognized for our innovation, excellence in patient care...</p>
                    </div>

                    <div className="image-gallery">
                        {images.length > 0 ? (
                            images.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.url} alt={image.name} className="img-fluid" />
                                </div>
                            ))
                        ) : (
                            <p>No images found</p>
                        )}
                    </div>
                </div>
                <br></br>
            </section>
        </div>
    );
}

export default Usrindex;
