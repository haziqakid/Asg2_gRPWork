const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul'); //bar
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container')
const btnScrollToTop = document.querySelector("#btnScrollToTop");


hamburger.addEventListener('click',() => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', ()=> {
    var scroll_position = window.scrollY;
    if(scroll_position > 250)
    {
        header.style.backgroundColor = "#29323c";
    }
    else 
    {
        header.style.backgroundColor = 'transparent';
    }
});

menu_item.forEach((item) => {
    item.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    })
})

btnScrollToTop.addEventListener("click", function() {
    //window.scrollTo(0,0);
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    }); 


});
















/*
let weather = {
    //"apiKey": "3451f3fa3c5b68c76fb330939f273eda",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?" + name + "')"
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};*/