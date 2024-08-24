import React, { useEffect, useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import room1 from '../img/index/01.jpeg';
import room2 from '../img/index/02.jpg';
import room3 from '../img/index/03.jpg';
import room4 from '../img/index/04.jpg';
import serv1 from '../img/index/05.jpg';
import serv3 from '../img/index/06.png';
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
    const [videoUrl, setVideoUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [videoError, setVideoError] = useState('');

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
            <img src={item.src} alt="Banner" />
            <CarouselCaption captionText="" captionHeader="" />
        </CarouselItem>
    ));

    const fetchVideo = async () => {
        try {
            const videoUrl = 'http://localhost:3004/video';
            setVideoUrl(videoUrl); 
        } catch (error) {
            console.error('Error en fetchVideo:', error.message);
            setVideoError('Error fetching video');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, []);

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
                        <br />
                        <span className="text-uppercase text-danger">Video Presentation</span>
                        <h2>Our Latest Video</h2>
                    </div>
                </div>
                <br />
                <div className="video-container">
                    {loading ? (
                        <p>Loading video...</p>
                    ) : videoError ? (
                        <p>{videoError}</p>
                    ) : (
                        videoUrl && (
                            <video width="100%" controls>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )
                    )}
                </div>
            </section>

            <section className="instagram spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="instagram__pic d-flex flex-wrap">
                                {[room1, room2, room3, room4, serv1, serv3].map((img, index) => (
                                    <div key={index} className="instagram__pic__item col-lg-4 col-md-4 col-sm-6 p-1">
                                        <img src={img} className="img-fluid" alt="Instagram" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="instagram__text p-3">
                                <h2>Information</h2>
                                <p>At Hospital Plus, we are dedicated to providing comprehensive and specialized medical care for all health needs. Additionally, we offer a wide range of services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
        </div>
    );
}

export default Usrindex;
