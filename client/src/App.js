import React, { Component } from "react";
import "./App.css";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/weatherComponent";
import Form from "./components/findWeather";
import Form2 from "./components/findWeatherByLoLa";
import "bootstrap/dist/css/bootstrap.min.css";
import Forecast from "./components/forecast";
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import {useAuth0} from '@auth0/auth0-react'



const Weather_API = process.env.REACT_APP_WEATHER_API_KEY;

class App extends Component {
	constructor() {
		super();
		this.state = {
			city: undefined,
			country: undefined,
			icon: undefined,
			main: undefined,
			currentTemp: undefined,
			maxTemp: undefined,
			minTemp: undefined,
			description: "",
			error: false,
			forecast: undefined,
			dailyData: [],
		};

		this.weatherIcon = {
			ThunderStorm: "wi-thunderstorm",
			Drizzle: "wi-sleet",
			Rain: "wi-storm-showers",
			Snow: "wi-snow",
			Atmosphere: "wi-fog",
			Clear: "wi-day-sunny",
			Clouds: "wi-day-fog",
		};
	}

	//Utility Function 1
	calCelsius(temprature) {
		return Math.floor(temprature - 273.15);
	}

	//Utility Function 2

	getWeatherIcons(icons, rangeId) {
		switch (true) {
			case rangeId >= 200 && rangeId <= 232:
				this.setState({ icon: this.weatherIcon.ThunderStorm });
				break;
			case rangeId >= 300 && rangeId <= 321:
				this.setState({ icon: this.weatherIcon.Drizzle });
				break;
			case rangeId >= 500 && rangeId <= 531:
				this.setState({ icon: this.weatherIcon.Rain });
				break;
			case rangeId >= 600 && rangeId <= 622:
				this.setState({ icon: this.weatherIcon.Snow });
				break;
			case rangeId >= 701 && rangeId <= 781:
				this.setState({ icon: this.weatherIcon.Atmosphere });
				break;
			case rangeId === 800:
				this.setState({ icon: this.weatherIcon.Clear });
				break;
			case rangeId >= 801 && rangeId <= 804:
				this.setState({ icon: this.weatherIcon.Clouds });
				break;
			default:
				this.setState({ icon: this.weatherIcon.Clear });
		}
	}

	//API CALLS
	getWeather = async (e) => {
		e.preventDefault();

		const city = e.target.elements.city.value;
		const country = e.target.elements.country.value;

		if (city && country) {
			const apiCall = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Weather_API}`
			);
			const response = await apiCall.json();

			console.log("Current Weather ", response);

			this.setState({
				city: `${response.name},${response.sys.country}`,
				currentTemp: this.calCelsius(response.main.temp),
				maxTemp: this.calCelsius(response.main.temp_max),
				minTemp: this.calCelsius(response.main.temp_min),
				description: response.weather[0].description,
				error: false,
			});

			this.getWeatherIcons(this.weatherIcon, response.weather[0].id);
		} else {
			this.setState({ error: true });
		}
	};

	getWeatherByLoLa = async (e) => {
		e.preventDefault();

		const longitude = e.target.elements.longitude.value;
		const latitude = e.target.elements.latitude.value;

		if (longitude && latitude) {
			const apiCall = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_API}`
			);
			const response = await apiCall.json();

			console.log(" Weather by LOLA ", response);

			this.setState({
				city: `${response.name},${response.sys.country}`,
				currentTemp: this.calCelsius(response.main.temp),
				maxTemp: this.calCelsius(response.main.temp_max),
				minTemp: this.calCelsius(response.main.temp_min),
				description: response.weather[0].description,
				error: false,
			});

			this.getWeatherIcons(this.weatherIcon, response.weather[0].id);
		} else {
			this.setState({ error: true });
		}
	};

	//Getting Forecast

	getWeatherThreedays = async (e) => {
		e.preventDefault();

		const longitude = e.target.elements.longitude.value;
		const latitude = e.target.elements.latitude.value;

		if (longitude && latitude) {
			const apiCall = await fetch(
				`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Weather_API}`
			);
			const response = await apiCall.json();

			console.log(" Weather for next 5 days ", response);
			const dailyData = response.list.filter((reading) =>
				reading.dt_txt.includes("00:00:00")
			);

			this.setState({
				city: `${response.city.name},${response.city.country}`,
				dailyData: dailyData,
				error: false,
			});

			console.log("City name ", response.city.name, response.city.country);
			console.log("Dailty Data ", this.state.dailyData);
		} else {
			this.setState({ error: true });
		}
	};

	///////////////////////////////

	render() {		

		const Profile = () => {

			const {user,isAuthenticated} = useAuth0();
			return ( 
				isAuthenticated && (
				<div>
					<img src={user.picture} alt={user.name} />
					<h2>{user.name}</h2>
					<p>{user.email}</p>
					{/* {JSON.stringify(user,null,2)} */}
					<Form loadWeather={this.getWeather} error={this.state.error} />
				<Form2 loadWeather={this.getWeatherByLoLa} error={this.state.error} />
				<h2>Weather forcast for next 5 days</h2>
				<Form2
					loadWeather={this.getWeatherThreedays}
					error={this.state.error}
				/>
					
				</div>
				)
			 );
			
		}
		let dailyData = this.state.dailyData;
		return (
			
			<div className="App">
				<h1>Weather App</h1>
				<LoginButton/>
				<LogoutButton/>
				<Profile/>
				

				{/* <Form loadWeather={this.getWeather} error={this.state.error} />
				<Form2 loadWeather={this.getWeatherByLoLa} error={this.state.error} /> */}
				<Weather
					city={this.state.city}
					country={this.state.country}
					currentTemp={this.state.currentTemp}
					maxTemp={this.state.maxTemp}
					minTemp={this.state.minTemp}
					description={this.state.description}
					weathericon={this.state.icon}
				/>
				{/* <Form2
					loadWeather={this.getWeatherThreedays}
					error={this.state.error}
				/> */}

				
				{dailyData.map((data) => (
					<Forecast
						key={data.dt}
						currentTemp={`${data.dt_txt} Temprature ${this.calCelsius(data.main.temp)}`}
						maxTemp={`Maximum Temprature ${this.calCelsius(
							data.main.temp_max
						)}`}
						minTemp={`Minimum Temprature ${this.calCelsius(
							data.main.temp_min
						)}`}
						description={`Forecast ${data.weather[0].description}`}
					/>
				))}
			</div>
		);
	}
}

export default App;
