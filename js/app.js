

//========================================================================================================================================================

"use strict";

// 8e0dca8b03bf2ae875f303ecc8bb09c2
//========================================================================================================================================================

function activAnimate() {
    const animItems = document.querySelectorAll('._anim-items');
    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 4;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                    animItem.classList.add('_active');
                } else {
                    if (!animItem.classList.contains('_anim-no-hide')) {
                        animItem.classList.remove('_active');
                    }
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);
    }
}

//========================================================================================================================================================
const iconMenu = document.querySelector('.icon-menu');
const menuWrap = document.querySelector('.menu__search');
function toggleClassMenu() {

    function toggleClass() {
        iconMenu.classList.toggle('menu-open');
        menuWrap.classList.toggle('menu-open');
    }
    iconMenu.addEventListener('click', toggleClass)
}
if (iconMenu && menuWrap) {
    toggleClassMenu()
}
//========================================================================================================================================================


const app = document.querySelector(".app");
// const script_link = "http://api.weatherstack.com/current?access_key=75c5a84211d803cd2b29de9cde7415f8";

const cardsWrap = document.querySelector('.tamplate__cards');
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

const fetchData = async () => {
    try {
        const query = localStorage.getItem("query") || store.city;
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru`);
        const data = await result.json();

        const { visibility, weather: { 0: { description } }, main: { temp: temperature, feels_like: feelsLike, humidity, pressure, }, wind: { speed: windSpeed }, name, clouds: { all: cloudcover } } = data;


        store = {
            ...store,

            city: name,
            temperature,
            feelsLike,
            description: description,
            properties: {
                windSpeed: {
                    title: "Скорость ветра",
                    value: `${windSpeed} м/с`,
                    icon: "wind.svg"
                },
                cloudcover: {
                    title: "Облачность",
                    value: `${cloudcover} % `,
                    icon: "cloud.svg"
                },
                visibility: {
                    title: "Видмость",
                    value: `${visibility / 100}% `,
                    icon: "visibility.svg"
                },
                humidity: {
                    title: "Влажность",
                    value: `${humidity} % `,
                    icon: "droplets.svg"
                },



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
        case "небольшая облачность":
            return "small_cloud.svg";
        case "небольшой дождь":
            return "rain.svg";

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
            return `
            <div class="main__property _anim-items _anim-no-hide">
				
					<img class="property__image" src="./img/${icon}" alt="">
				
				<div class="property__info">
					<div class="property__info-value">${value}</div>
					<div class="property__info-description">${title}</div>
				</div>
			</div>
            `;
        })
        .join("");
};
const appWrap = document.getElementById("app");
const wrapper = document.querySelector('.wrapper');
let date = new Date();
let fullDate = `${date.getDate()}.0${date.getMonth() + 1}.${date.getFullYear()}`
const dateWrap = document.querySelector('.date__wrap');

const markup = () => {
    const { city, description, feelsLike, temperature, properties } = store;
    return `
    <header class="header">
            <h2 id="city" class="header__title">${city}</h2>
		    <p class="header__date">${fullDate}</p>
       
		
		<div class="header__data">
			<div class="header__info _anim-items _anim-no-hide">
				<div class="header__temperature">${Math.round(temperature)}° </div>
                <span>Ощущается <br> как ${Math.round(feelsLike)}°</span>
				<div class="header__description">${description}</div>
			</div>
			<div class="header__icon _anim-items _anim-no-hide">
				<img class="header__image" src="img/${getImage(description)}" alt="">
			</div>
		</div>

	</header>
	<main class="main">
		<div id="properties" class="main__properties">
			${renderProperty(properties)}
		</div>
	</main>
   
    `;
};



const renderComponent = () => {
    wrapper.innerHTML = markup()
    activAnimate()
};
const textInput = document.getElementById("text-input");
const script_form = document.querySelector("form");
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
    cardsWrap.innerHTML = '';
    fetchAll();
    input.value = '';
    iconMenu.classList.remove('menu-open');
    menuWrap.classList.remove('menu-open');

};

script_form.addEventListener("submit", handleSubmit);
textInput.addEventListener("input", handleInput);
fetchData();

//========================================================================================================================================================
//========================================================================================================================================================

//========================================================================================================================================================

let storeHour = {
    date: 0,
    temperature: 0,
    description: "",


};
const fetchAll = async () => {
    try {
        const query = localStorage.getItem("query") || store.city;
        const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru`);
        const data = await result.json();
        const listResult = data.list;
        const setDayBtns = document.querySelectorAll('.tamplate__title');
        console.log(setDayBtns);
        const tommorowWeather = listResult.filter(function (e) {
            let date = new Date();
            let fullDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate() + 1}`
            // console.log(e.dt_txt);
            const itemDate = e.dt_txt.slice(0, 10);

            if (itemDate == fullDate) {
                return e;
            }
        })
        const todayWeather = listResult.filter(function (e) {
            let date = new Date();
            let fullDate = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`
            // console.log(e.dt_txt);
            const itemDate = e.dt_txt.slice(0, 10);

            if (itemDate == fullDate) {
                return e;
            }
        })
        let current = todayWeather;
        setDayBtns.forEach(item => {

            item.addEventListener('click', (e) => {

                const cardsWrap = document.querySelector('.tamplate__cards');
                if (e.target.innerText == "Завтра") {
                    current = tommorowWeather;

                    cardsWrap.innerHTML = "";
                    setDay(current)
                } else if (e.target.innerText == "Сегодня") {
                    current = todayWeather;

                    cardsWrap.innerHTML = "";
                    setDay(current)
                }
            })
        })

        for (let i = 0; i < setDayBtns.length; i++) {
            setDayBtns[i].addEventListener('click', function () {

                for (let i = 0; i < setDayBtns.length; i++) {
                    setDayBtns[i].classList.remove('active');
                }
                this.classList.add('active');
            })
        }
        setDay(current)


        function setDay(dayList) {
            dayList.forEach(item => {

                const { weather: { 0: { description } }, main: { temp: temperature, feels_like: feelsLike, }, dt_txt: date } = item;
                storeHour = {
                    date,
                    temperature,
                    description,
                    feelsLike,


                };
                const markup = () => {
                    const { description, temperature, date, feelsLike } = storeHour;
                    console.log(description);
                    getImage(description);
                    return `<div class="tamplate__card _anim-items _anim-no-hide ">
						<div class="card__date">${date.slice(11, 16)}</div>
						<img src="img/${getImage(description)}" alt="" class="card__image">
						<div class="card__temp">${Math.round(temperature)}° <span>(${Math.round(feelsLike)}°)</span></div>
					</div>`
                }


                // cardsWrap.innerHTML = '';
                cardsWrap.insertAdjacentHTML("beforeend", markup());

            });
            const cardInfo = document.querySelectorAll('.tamplate__card');
            cardInfo.forEach(item => {
                function addAnimate() {
                    item.style.opacity = '1';
                    item.style.transform = 'translate(0, 0%)';
                }
                setTimeout(addAnimate, 500)
            })
        }





    } catch (err) {
        console.log(err);
    }
};

fetchAll();
const fetchMap = async () => {
    try {
        //https://tile.openweathermap.org/map/wind_new/10/{x}/{y}.png?appid=8e0dca8b03bf2ae875f303ecc8bb09c2
        const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=8e0dca8b03bf2ae875f303ecc8bb09c2&units=metric&lang=ru`);
        const data = await result.json();














    } catch (err) {
        console.log(err);
    }
};