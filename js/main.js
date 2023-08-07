// https://www.7timer.info/bin/api.pl?lon=52.367&lat=4.904&product=civillight&output=json
// coords.lon = 52.367
// coords.lat = 4.904
let result;

onload = fetch("./js/city_coordinates.csv")
        .then(res => res.text())
        .then(data => {
             result = data.split("\n").map(
                e =>{ return e.split(",")}
            )

            // select option for city names
            result.forEach( e => {
                let obj = document.createElement("option");
                obj.text = e[3];
                obj.value = [e[0], e[1]];
                citiesName.appendChild(obj);
                
            })

        

        })

citiesName.onchange = function () {
            // weatherDate.innerText =
            let [long, lati] = citiesName.value.split(",");
            var  dayData;
            fetch(`https://www.7timer.info/bin/api.pl?lon=${long}&lat=${lati}&product=civillight&output=json`)
            .then(res => res.json())
            .then(data => {
                dayData = data.dataseries[0]
                console.log(dayData.date); 
                console.log(dayData.weather); 
                console.log(dayData.temp2m.min); 
                console.log(dayData.temp2m.max); 
                console.log(dayData); 
                
            })
           
            

        } 

