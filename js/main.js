
let result;
var forecastEl = document.getElementsByClassName("card-section");
let obj = document.getElementsByClassName("option");



const setOptions = (result) => {
    result.forEach( e => {
       obj = document.createElement("option");
        obj.text = (e[2]+", "+e[3]);
        obj.value = [e[0], e[1]];
        citiesName.appendChild(obj);               
    })
}

const setCityNames = () => {
  fetch("./js/city_coordinates.csv")
        .then(res => res.text())
        .then(data => {
             result = data.split("\n").map(
                e =>{ return e.split(",")}
            )
            // select option for city names
            setOptions(result);
        })
}

setCityNames();

const getCoordinates = () =>{
                    citiesName.onchange = function () {
                          let [long, lati] = citiesName.value.split(",");
                          getWeatherDetails(long,lati);
                    }
}

function getWeatherDetails(long,lati){
        fetch(`https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lati}&product=civillight&output=json`)
                .then(res => res.json())
                .then(data => {
                     
                    // forecastEl.innerHTML = "";
                    const resultData = data.dataseries;
                    forecastEl[0].innerHTML = "";
                    resultData.forEach(
                        e => { 
                    forecastEl[0].insertAdjacentHTML("beforeend",createCard(e));
                     })
                }).catch(() => {
                    alert("An error occurred while fetching the weather forecast!");
                });
      
}

function createCard(e){     
            let [icon,description] = getweatherIcon(e.weather);
             let fday = `<div class="card">
                      <div class="card-head">
                     <p class="weather-date" id="weatherDate">${getDate(e.date)}</p>
                     <div class="weather-icon-div">  <img src="${icon}" alt="${e.weather}</"></div>
                     </div>
                     <div class="card-bottom">
                     <p class="weather-description">${description}</p>
                     <p class="weather-temperatures">High: <span class="celcius">${e.temp2m.max}  ºC</span><span class="fahrenheit" style="display: none;">${e.temp2m.max}ºF</span></p>
                     <p class="weather-temperatures">Low: <span class="celcius">${e.temp2m.min}  ºC</span><span class="fahrenheit" style="display: none;">${e.temp2m.min} ºF</span></p>
                    </div>
                    </div>`;
         return fday;
}

function getDate(d){
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let text = d.toString();
    let year = text.slice(0,4);
    let month = text.slice(4,6);
    let day = text.slice(6,8);
    let date= `${year}-${month}-${day}`;
    const dateObj = new Date(date);
    let gMonth = months[dateObj.getMonth()];
    let gDate = dateObj.getDate();
    let gDay = days[dateObj.getDay()];
    return `${gDay} ${gMonth} ${gDate}`;
  
    
}



function getweatherIcon(weather){
    let icon;
    let description;
    switch(weather){
        case 'clear':
             icon = `images/clear.png`;
             description  = "Clear";
            break;
        case 'mcloudy':
             icon = `images/mcloudy.png`;
             description  = "Cloudy";
            break;
        case 'cloudy':
             description  = "Very Cloudy";
             icon = `images/clear.png`;
            break;
        case 'fog':
             description  = "Foggy";
             icon = `images/fog.png`;
            break;
        case 'humid':
            icon = `images/humid.png`;
            description  = "Humid";
            break;
        case 'ishower':
             description  = "Isolated showers";
             icon = `images/ishower.png`;
            break;
        case 'lightrain':
             description  = "Light rain or showers";
             icon = `images/lightrain.png`;
            break;
         case 'lightsnow':
             description  = "Light or occasional snow";
             icon = `images/lightsnow.png`;
            break;
        case 'oshower':
             description  = "Occasional showers";
             icon = `images/oshower.png`;
            break;
        case 'pcloudy':
             description  = "Partly Cloudy";
             icon = `images/pcloudy.png`;
               break;
         case 'rain':
             description  = "Rain";
             icon = `images/rain.png`;
               break;
        case 'rainsnow':
             description  = "Mixed Rain and Snow";
             icon = `images/rainsnow.png`;
               break;
        case 'snow':
             description  = "Snow";
             icon = `images/snow.png`;
               break;
        case 'tstorm':
             description  = "Thunderstorm possible";
             icon = `images/tstorm.png`;
               break;
        case 'ts':
             description  = "Thunderstorm";
             icon = `images/tsrain.png`;
               break;
        case 'windy':
             description  = "Windy";
             icon = `images/windy.png`;
               break;
    
        default:
            console.log('error');
        
    }
    return [icon,description];
}

getCoordinates();
