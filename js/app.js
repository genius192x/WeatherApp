
"use strict";
// let isMobile = {
//     Android: function () {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function () {
//         return navigator.userAgent.match(/BlackBerry/i);
//     },
//     iOS: function () {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function () {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function () {
//         return navigator.userAgent.match(/IEMobile/i);
//     },
//     any: function () {
//         return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
//     }
// };
// function addTouchClass() {
//     if (isMobile.any()) document.documentElement.classList.add("touch");
// }
// function addLoadedClass() {
//     window.addEventListener("load", (function () {
//         setTimeout((function () {
//             document.documentElement.classList.add("loaded");
//         }), 0);
//     }));
// }
// function fullVHfix() {
//     const fullScreens = document.querySelectorAll("[data-fullscreen]");
//     if (fullScreens.length && isMobile.any()) {
//         window.addEventListener("resize", fixHeight);
//         function fixHeight() {
//             let vh = .01 * window.innerHeight;
//             document.documentElement.style.setProperty("--vh", `${vh}px`);
//         }
//         fixHeight();
//     }
// }

// function menuInit() {
//     if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
//         if (bodyLockStatus && e.target.closest(".icon-menu")) {
//             bodyLockToggle();
//             document.documentElement.classList.toggle("menu-open");
//         }
//     }));
// }
// // 8e0dca8b03bf2ae875f303ecc8bb09c2
// const da = new DynamicAdapt("max");
// da.init();
// const root = document.getElementById("root");
// const script_link = "http://api.weatherstack.com/current?access_key=75c5a84211d803cd2b29de9cde7415f8";
// const popup = document.getElementById("popup");
// const textInput = document.getElementById("text-input");
// const script_form = document.getElementById("form");
// let store = {
//     city: "Taganrog",
//     temperature: 0,
//     observationTime: "00:00 AM",
//     isDay: "yes",
//     description: "",
//     properties: {
//         cloudcover: {},
//         humidity: {},
//         windSpeed: {},
//         pressure: {},
//         uvIndex: {},
//         visibility: {}
//     }
// };
// const fetchData = async () => {
//     try {
//         const query = localStorage.getItem("query") || store.city;
//         const result = await fetch(`${script_link}&query=${query}`);
//         const data = await result.json();
//         const { current: { cloudcover, temperature, humidity, observation_time: observationTime, pressure, uv_index: uvIndex, visibility, is_day: isDay, weather_descriptions: description, wind_speed: windSpeed }, location: { name } } = data;
//         store = {
//             ...store,
//             isDay,
//             city: name,
//             temperature,
//             observationTime,
//             description: description[0],
//             properties: {
//                 cloudcover: {
//                     title: "cloudcover",
//                     value: `${cloudcover}%`,
//                     icon: "cloud.png"
//                 },
//                 humidity: {
//                     title: "humidity",
//                     value: `${humidity}%`,
//                     icon: "humidity.png"
//                 },
//                 windSpeed: {
//                     title: "wind speed",
//                     value: `${windSpeed} km/h`,
//                     icon: "wind.png"
//                 },
//                 pressure: {
//                     title: "pressure",
//                     value: `${pressure} %`,
//                     icon: "gauge.png"
//                 },
//                 uvIndex: {
//                     title: "uv Index",
//                     value: `${uvIndex} / 100`,
//                     icon: "uv-index.png"
//                 },
//                 visibility: {
//                     title: "visibility",
//                     value: `${visibility}%`,
//                     icon: "visibility.png"
//                 }
//             }
//         };
//         renderComponent();
//     } catch (err) {
//         console.log(err);
//     }
// };
// const getImage = description => {
//     const value = description.toLowerCase();
//     switch (value) {
//         case "overcast":
//             return "partly.png";

//         case "cloud":
//             return "cloud.png";

//         case "fog":
//             return "fog.png";

//         case "sunny":
//             return "sunny.png";

//         case "cloud":
//             return "cloud.png";

//         case "clear":
//             return "clear.png";

//         case "light rain":
//             return "light-rain.svg";

//         default:
//             return "the.png";
//     }
// };
// const renderProperty = properties => Object.values(properties).map((({ title, value, icon }) => `<div class="property">\n            <div class="property-icon">\n              <img class="property-icons" src="./img/${icon}" alt="">\n            </div>\n            <div class="property-info">\n              <div class="property-info__value">${value}</div>\n              <div class="property-info__description">${title}</div>\n            </div>\n          </div>`)).join("");
// const appWrap = document.getElementById("app");
// const markup = () => {
//     const { city, description, observationTime, temperature, isDay, properties } = store;
//     const containerClass = "yes" === isDay ? "is-day" : "";
//     console.log(containerClass);
//     if ("is-day" == containerClass) appWrap.classList.add("is-day"); else appWrap.classList.remove("is-day");
//     return `<div class="container">\n            <div class="top">\n\t\t\t\t\t <div type="button" class="menu__icon icon-menu"><span></span></div>\n\t\t\t\t\t\t\n              <div class="city">\n                <div class="city-subtitle">Weather Today in</div>\n                  <div class="city-title" id="city">\n                  <span>${city}</span>\n                </div>\n              </div>\n              <div class="city-info">\n                <div class="top-left">\n                <img class="icon" src="./img/${getImage(description)}" alt="" />\n                <div class="description">${description}</div>\n              </div>\n            \n              <div class="top-right">\n                <div class="city-info__subtitle">as of ${observationTime}</div>\n                <div class="city-info__title">${temperature}°</div>\n              </div>\n            </div>\n          </div>\n        <div id="properties">${renderProperty(properties)}</div>\n      </div>`;
// };
// const togglePopupClass = () => {
//     popup.classList.toggle("active");
// };
// const closeSearch = () => {
//     const closeBtn = document.querySelector(".popup-close");
//     closeBtn.addEventListener("click", togglePopupClass);
// };
// closeSearch();
// const renderComponent = () => {
//     root.innerHTML = markup();
//     const button = document.querySelector(".menu__icon");
//     button.addEventListener("click", togglePopupClass);
// };
// const handleInput = e => {
//     store = {
//         ...store,
//         city: e.target.value
//     };
// };
// const handleSubmit = e => {
//     e.preventDefault();
//     const value = store.city;
//     appWrap.classList.remove("is-day");
//     if (!value) return null;
//     localStorage.setItem("query", value);
//     fetchData();
//     togglePopupClass();
// };
// script_form.addEventListener("submit", handleSubmit);
// textInput.addEventListener("input", handleInput);
// fetchData();
// window["FLS"] = false;
// addTouchClass();
// addLoadedClass();
// menuInit();
// fullVHfix();
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
        case "overcast":
            return "partly.png";

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

        case "light rain":
            return "light-rain.svg";

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
    const value = store.city;
    appWrap.classList.remove("is-day");
    if (!value) return null;
    const input = document.querySelector('.form-input');
    localStorage.setItem("query", value);

    fetchData();
    input.value = '';

};
script_form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);
fetchData();
