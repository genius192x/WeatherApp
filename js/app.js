(() => {
    "use strict";
    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
    };
    function addTouchClass() {
        if (isMobile.any()) document.documentElement.classList.add("touch");
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            setTimeout((function() {
                document.documentElement.classList.add("loaded");
            }), 0);
        }));
    }
    function fullVHfix() {
        const fullScreens = document.querySelectorAll("[data-fullscreen]");
        if (fullScreens.length && isMobile.any()) {
            window.addEventListener("resize", fixHeight);
            function fixHeight() {
                let vh = .01 * window.innerHeight;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }
            fixHeight();
        }
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function DynamicAdapt(type) {
        this.type = type;
    }
    DynamicAdapt.prototype.init = function() {
        const _this = this;
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        this.nodes = document.querySelectorAll("[data-da]");
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
        this.arraySort(this.оbjects);
        this.mediaQueries = Array.prototype.map.call(this.оbjects, (function(item) {
            return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }), this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, (function(item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        }));
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ",");
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, (function(item) {
                return item.breakpoint === mediaBreakpoint;
            }));
            matchMedia.addListener((function() {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            }));
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
        if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        } else for (let i = оbjects.length - 1; i >= 0; i--) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
    };
    DynamicAdapt.prototype.moveTo = function(place, element, destination) {
        element.classList.add(this.daClassname);
        if ("last" === place || place >= destination.children.length) {
            destination.insertAdjacentElement("beforeend", element);
            return;
        }
        if ("first" === place) {
            destination.insertAdjacentElement("afterbegin", element);
            return;
        }
        destination.children[place].insertAdjacentElement("beforebegin", element);
    };
    DynamicAdapt.prototype.moveBack = function(parent, element, index) {
        element.classList.remove(this.daClassname);
        if (void 0 !== parent.children[index]) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
    };
    DynamicAdapt.prototype.indexInParent = function(parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    DynamicAdapt.prototype.arraySort = function(arr) {
        if ("min" === this.type) Array.prototype.sort.call(arr, (function(a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) return 0;
                if ("first" === a.place || "last" === b.place) return -1;
                if ("last" === a.place || "first" === b.place) return 1;
                return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
        })); else {
            Array.prototype.sort.call(arr, (function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if ("first" === a.place || "last" === b.place) return 1;
                    if ("last" === a.place || "first" === b.place) return -1;
                    return b.place - a.place;
                }
                return b.breakpoint - a.breakpoint;
            }));
            return;
        }
    };
    const da = new DynamicAdapt("max");
    da.init();
    const root = document.getElementById("root");
    const script_link = "http://api.weatherstack.com/current?access_key=75c5a84211d803cd2b29de9cde7415f8";
    const popup = document.getElementById("popup");
    const textInput = document.getElementById("text-input");
    const script_form = document.getElementById("form");
    let store = {
        city: "Taganrog",
        temperature: 0,
        observationTime: "00:00 AM",
        isDay: "yes",
        description: "",
        properties: {
            cloudcover: {},
            humidity: {},
            windSpeed: {},
            pressure: {},
            uvIndex: {},
            visibility: {}
        }
    };
    const fetchData = async () => {
        try {
            const query = localStorage.getItem("query") || store.city;
            const result = await fetch(`${script_link}&query=${query}`);
            const data = await result.json();
            const {current: {cloudcover, temperature, humidity, observation_time: observationTime, pressure, uv_index: uvIndex, visibility, is_day: isDay, weather_descriptions: description, wind_speed: windSpeed}, location: {name}} = data;
            store = {
                ...store,
                isDay,
                city: name,
                temperature,
                observationTime,
                description: description[0],
                properties: {
                    cloudcover: {
                        title: "cloudcover",
                        value: `${cloudcover}%`,
                        icon: "cloud.png"
                    },
                    humidity: {
                        title: "humidity",
                        value: `${humidity}%`,
                        icon: "humidity.png"
                    },
                    windSpeed: {
                        title: "wind speed",
                        value: `${windSpeed} km/h`,
                        icon: "wind.png"
                    },
                    pressure: {
                        title: "pressure",
                        value: `${pressure} %`,
                        icon: "gauge.png"
                    },
                    uvIndex: {
                        title: "uv Index",
                        value: `${uvIndex} / 100`,
                        icon: "uv-index.png"
                    },
                    visibility: {
                        title: "visibility",
                        value: `${visibility}%`,
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

          case "cloud":
            return "cloud.png";

          case "fog":
            return "fog.png";

          case "sunny":
            return "sunny.png";

          case "cloud":
            return "cloud.png";

          case "clear":
            return "clear.png";

          case "light rain":
            return "light-rain.svg";

          default:
            return "the.png";
        }
    };
    const renderProperty = properties => Object.values(properties).map((({title, value, icon}) => `<div class="property">\n            <div class="property-icon">\n              <img class="property-icons" src="./img/${icon}" alt="">\n            </div>\n            <div class="property-info">\n              <div class="property-info__value">${value}</div>\n              <div class="property-info__description">${title}</div>\n            </div>\n          </div>`)).join("");
    const appWrap = document.getElementById("app");
    const markup = () => {
        const {city, description, observationTime, temperature, isDay, properties} = store;
        const containerClass = "yes" === isDay ? "is-day" : "";
        console.log(containerClass);
        if ("is-day" == containerClass) appWrap.classList.add("is-day"); else appWrap.classList.remove("is-day");
        return `<div class="container">\n            <div class="top">\n\t\t\t\t\t <div type="button" class="menu__icon icon-menu"><span></span></div>\n\t\t\t\t\t\t\n              <div class="city">\n                <div class="city-subtitle">Weather Today in</div>\n                  <div class="city-title" id="city">\n                  <span>${city}</span>\n                </div>\n              </div>\n              <div class="city-info">\n                <div class="top-left">\n                <img class="icon" src="./img/${getImage(description)}" alt="" />\n                <div class="description">${description}</div>\n              </div>\n            \n              <div class="top-right">\n                <div class="city-info__subtitle">as of ${observationTime}</div>\n                <div class="city-info__title">${temperature}°</div>\n              </div>\n            </div>\n          </div>\n        <div id="properties">${renderProperty(properties)}</div>\n      </div>`;
    };
    const togglePopupClass = () => {
        popup.classList.toggle("active");
    };
    const closeSearch = () => {
        const closeBtn = document.querySelector(".popup-close");
        closeBtn.addEventListener("click", togglePopupClass);
    };
    closeSearch();
    const renderComponent = () => {
        root.innerHTML = markup();
        const button = document.querySelector(".menu__icon");
        button.addEventListener("click", togglePopupClass);
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
        localStorage.setItem("query", value);
        fetchData();
        togglePopupClass();
    };
    script_form.addEventListener("submit", handleSubmit);
    textInput.addEventListener("input", handleInput);
    fetchData();
    window["FLS"] = false;
    addTouchClass();
    addLoadedClass();
    menuInit();
    fullVHfix();
})();