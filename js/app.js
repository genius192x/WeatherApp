
"use strict";

//========================================================================================================================================================

"use strict";

// 8e0dca8b03bf2ae875f303ecc8bb09c2


const root = document.getElementById("root");
// const script_link = "http://api.weatherstack.com/current?access_key=75c5a84211d803cd2b29de9cde7415f8";
const popup = document.getElementById("popup");
const textInput = document.getElementById("text-input");
const script_form = document.getElementById("form");
let store = {
    city: "Taganrog",
    temperature: 0,

    feelsLike: 0,
    description: "",
    properties: {
        cloudcover: {},
        humidity: {},
        windSpeed: {},
        pressure: {},

        visibility: {}
    }
};
//https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru
// https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru
const fetchData = async () => {
    try {
        const query = localStorage.getItem("query") || store.city;
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru`);
        const data = await result.json();
        console.log(data);
        const { visibility, weather: { 0: { description } }, main: { temp: temperature, feels_like: feelsLike, humidity, pressure, }, wind: { speed: windSpeed }, name, clouds: { all: cloudcover } } = data;


        store = {
            ...store,

            city: name,
            temperature,
            feelsLike,
            description: description,
            properties: {
                cloudcover: {
                    title: "Облачность",
                    value: `${cloudcover} % `,
                    icon: "cloud.png"
                },
                humidity: {
                    title: "Влажность",
                    value: `${humidity} % `,
                    icon: "humidity.png"
                },
                windSpeed: {
                    title: "Скорость ветра",
                    value: `${windSpeed} km / h`,
                    icon: "wind.png"
                },
                pressure: {
                    title: "Давление",
                    value: `${pressure} % `,
                    icon: "gauge.png"
                },
                // uvIndex: {
                //     title: "uv Index",
                //     value: `${ uvIndex } / 100`,
                //     icon: "uv-index.png"
                // },
                visibility: {
                    title: "Видмость",
                    value: `${visibility / 100}% `,
                    icon: "visibility.png"
                }
            }
        };
        renderComponent();
    } catch (err) {
        console.log(err);
    }
};
const getImage = description => {
    const value = description.toLowerCase();

    switch (value) {
        case "небольшая морось":
            return "rain.svg";

        case "переменная облачность":
            return "small_cloud.svg";

        case "облачно с прояснениями":
            return "small_cloud.svg";
        case "пасмурно":
            return "smoke.svg";

        case "дождь":
            return "rain.svg";

        case "облачно":
            return "cloudy.svg";

        case "ясно":
            return "clear.svg";

        case "небольшой снег":
            return "smalSnow.png";

        default:
            return "the.png";
    }
};
const renderProperty = (properties) => {
    return Object.values(properties)
        .map(({ title, value, icon }) => {
            return `<div class="property">
            <div class="property-icon">
              <img class="property-icons" src="./img/${icon}" alt="">
            </div>
            <div class="property-info">
              <div class="property-info__value">${value}</div>
              <div class="property-info__description">${title}</div>
            </div>
          </div>`;
        })
        .join("");
};
const appWrap = document.getElementById("app");
const markup = () => {
    const { city, description, observationTime, feelsLike, temperature, isDay, properties } = store;
    const containerClass = "yes" === isDay ? "is-day" : "";

    if ("is-day" == containerClass) appWrap.classList.add("is-day"); else appWrap.classList.remove("is-day");
    return `
        <div div class="container" >
    
        <div class="top">
           
                <div class="city">               
                <div class="city-subtitle"></div>
                <div class="city-title" id="city">
                <span>${city}</span>               
                </div>
            </div>
            <div class="city-info">
                <div class="top-left">
                    <img class="icon" src="./img/${getImage(description)}" alt="" />               
                    <div class="description">${description}</div>              
                </div>                          
                <div class="top-right">                
                    <div class="city-info__subtitle">Ощущается как ${Math.round(feelsLike)}</div>
                    <div class="city-info__title">${Math.round(temperature)}°</div>              
                </div>
            </div>
        </div>
        <div id="properties">${renderProperty(properties)}</div>      
    </div > `;
};

// const closeSearch = () => {
//     const closeBtn = document.querySelector(".popup-close");
//     closeBtn.addEventListener("click", togglePopupClass);
// };

const renderComponent = () => {
    root.innerHTML = markup();


};
const handleInput = e => {
    store = {
        ...store,
        city: e.target.value
    };
};
const handleSubmit = e => {
    e.preventDefault();
    const value = store.city.trim();

    if (!value) return null;
    const input = document.querySelector('.form-input');
    localStorage.setItem("query", value);

    fetchData();
    input.value = '';

};
script_form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);
fetchData();
