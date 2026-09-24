const btn = document.getElementById('searchBtn');
const cityName = document.getElementById("cityName");
const API_key = '73e789c1dd9c548376b333b8413b5261';


async function fetchDataByCity(city){
    try{
      cityName.value ="";
      console.log("city name" , city);
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
      );21
      let result = await res.json();
      console.log(result);
      if(result.message){
        document.getElementById(
         "secondDiv"
        ).innerHTML = `<h1>${city} ${result.message}</h1>`;
        return;
      }
      displayWeather(result);
    } catch(err){
      console.log(err.message);
    }
}
async function fetchDataByCoordinates(lati , longi){
    try{
      console.log(lati,longi);
      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${API_key}&units=metric`
      );
      let result = await res.json();
      if(result.message){
        document.getElementById(
    "secondDiv"
    ).innerHTML = `<h1>${city} ${result.message}</h1>`;
      }
      displayWeather(result);
    } catch(err){
      console.log(err.message);
    }

}


btn.addEventListener('click' ,() => {
    fetchDataByCity(cityName.value);
});


function displayWeather({name , main , wind}){
document.getElementById("secondDiv").innerHTML = 
    `<div id="weatherInfo">
                <p id="temp">${main.temp}</p>
                <p id="city">${name}</p>
                <div class="otherInfo">
                     <div class="wind">
                          <p>Wind</p>
                          <p>${main.pressure}m/s</p>
                     </div>
                     <div class="wind">
                          <P>Pressure</P>
                          <P>${main.pressure}ma</P>
                     </div>
                     <div class="wind">
                        <P>Humidity</P>
                        <P>${main.humidity}%</P>
                     </div>
                </div>
            </div> `
}



document.getElementById("currLoc").addEventListener("click",() =>{
    navigator.geolocation.getCurrentPosition((position) =>{
        let lati = position.coords.longitude
        let longi = position.coords.longitude
        fetchDataByCoordinates(lati , longi)
    })
});


