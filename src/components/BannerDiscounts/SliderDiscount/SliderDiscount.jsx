/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function SliderDiscount({ item }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const countdownEnd = new Date(item?.countdown_end);

        const updateTime = () => {
            const now = new Date();
            const timeDifference = countdownEnd - now;

            if (timeDifference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return; 
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        updateTime();
        const timer = setInterval(updateTime, 1000); 

        return () => clearInterval(timer); 
    }, [item?.countdown_end]);

    return (
        <div className="slider-discount">
            <div className="slider-discount-image">
                <img src={item?.images[0]} alt={item?.name} className="image-discount" />
                <img src={item?.images[1]} alt={item?.name} className="hover-image-discount" />
            </div>
            <div className="space"></div>
            <div className="slider-discount-content">
                <h2>{item?.name}</h2>
                <h4><del>${item?.old_price}</del> ${item?.new_price}</h4>

                <div className="box-bar">
                    <div className="stock">
                        <span className="stock-available">
                            Available: <strong>{item?.available}</strong>
                        </span>
                        <span className="stock-sold">
                            Already Sold: <strong>{item?.sold}</strong>
                        </span>
                    </div>
                    <div className="bar">
                        <div
                            className="progress-bar"
                            style={{
                                width: `${(item?.sold / (item?.sold + item?.available)) * 100}%`,
                            }}
                        ></div>
                    </div>
                </div>

                <div className="box-data">
                    <div className="box-day">
                        <span className="data-time">{timeLeft.days}</span>
                        <span>Days</span>
                    </div>
                    <div className="box-hour">
                        <span className="data-time">{timeLeft.hours}</span>
                        <span>Hours</span>
                    </div>
                    <div className="box-minute">
                        <span className="data-time">{timeLeft.minutes}</span>
                        <span>mins</span>
                    </div>
                    <div className="box-second">
                        <span className="data-time">{timeLeft.seconds}</span>
                        <span>secs</span>
                    </div>
                </div>

                <button className="btn btn-discount">Shop Now</button>
            </div>
        </div>
    );
}
