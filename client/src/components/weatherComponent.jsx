import React from "react";

const Weather = (props) => {
	return (
		<div className="container text-light">
			<div className="cards pt-4">
				<h1>{props.city}</h1>
				<h5 className="py-4">
					<i className={`wi ${props.weathericon}  display-1`}></i>
				</h5>
				{/* <h1 className="py-2">{props.currentTemp}&deg;</h1> */}
				{props.currentTemp ? (
					<h1 className="py-2">{props.currentTemp}&deg;</h1>
				) : null}

				{minMaxTemprature(props.minTemp, props.maxTemp)}

				<h4 className="py-3">{props.description}</h4>
			</div>

            {/* <div>
                <h1>Weather forcast for next 5 days</h1>
            </div> */}
		</div>
	);
};

function minMaxTemprature(min, max) {
	if (min && max) {
		return (
			<h3>
				<span className="px-4">{min}&deg;</span>
				<span className="px-4">{max}&deg;</span>
			</h3>
		);
	}
}

export default Weather;
