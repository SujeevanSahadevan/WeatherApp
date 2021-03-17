import React from "react";
import "./findWeatherByLoLa.css";

const Form2 = (props) => {
	return (
		<div className="container">
			<div>{props.error ? error() : null}</div>
			<form onSubmit={props.loadWeather}>
				<div className="row">
					<div className="col-md-3 offset-md-2">
						<input
							type="text"
							className="form-control"
							name="longitude"
							autoComplete="off"
							placeholder="Longitude"></input>
					</div>
					<div className="col-md-3">
						<input
							type="text"
							className="form-control"
							name="latitude"
							autoComplete="off"
							placeholder="Latitude"></input>
					</div>
					<div className="col-md-3 mt-md-0 py-2 text-md-left">
						<button className="btn btn-warning">Find Weather</button>
					</div>
				</div>
			</form>
		</div>
	);
};

function error() {
	return (
		<div className="alert alert-danger mx-5" role="alert">
			{" "}
			Please Enter the Longitude and Latitude
		</div>
	);
}

export default Form2;
