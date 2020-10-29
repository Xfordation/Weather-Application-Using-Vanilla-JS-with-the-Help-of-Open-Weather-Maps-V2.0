class UI {
  constructor() {
    this.city = document.getElementById("city");
    this.txt = document.getElementById("t1");
  }

  //Show City Name and Tempture
  showcity(data) {
    let op = "";
    const cityname = this.txt.value;
    data.forEach((i) => {
      op += `
                <div class="cityname text-light" id="cityname" >
                    <h2 class="text-family-Nunito">${cityname}</h2>
                </div> 
                <div class="desc" id="desc">
                <div id="weather-condition" class="weather-condition"></div>
                    <h2 id="cond" class="text-light text-center margin-auto text-family-Nunito">${i.main}</h2>
                    </div>
                <div class="temp" id="temp"></div>
                <div class="hourly-info" id="hourly-info"></div>
                <div class="table" id="table"></div>
                `;
    });
    this.city.className = "city";
    this.city.innerHTML = op;
  }

  //Show temprature
  showtemp(data) {
    let op = "";

    //converting to celcius
    op += `<h1 class=" margin-auto text-center text-large text-family-Nunito">${this.getTempByCels(
      data.temp
    )}&degC</h1>`;

    document.getElementById("temp").innerHTML = op;
  }

  //Show Table
  //Show Sunrise and Sunset
  displayTable(data, data1, data2, data3) {
    let op = "";
    op += `<table id="tbl">
                <tr><th>Sunrise</th><th>sunset</th></tr>
                <td>${this.convertUnixTime(data.sunrise)} AM</td>
                <td>${this.convertUnixTime(data.sunset)} PM</td>
                
                <tr><th>Minimum Tempture</th><th>Maximum Tempture</th></tr>
                <td>${this.getTempByCels(data1.temp_min)}&degC</td>
                <td>${this.getTempByCels(data1.temp_max)}&degC</td>
                
                <tr><th>Humidity</th><th>Feels Like</th></tr>
                <td>${data1.humidity}%</td>
                <td>${this.getTempByCels(data1.feels_like)}&degC</td>
                
                <tr><th>Wind</th><th>Visibility</th></tr>
                <td>${(data2.speed * (60 * 60)) / 1000} KM/H</td>
                <td>${data3.visibility / 1000} km</td>
                </table>`;
    document.getElementById("table").innerHTML = op;

    // Display Navbar
    if (document.getElementById("table").innerHTML != "") {
      document.getElementById("nav").style.display = "flex";
    }

    // Calling remove Table
    this.removeTable();
  }

  // Remove Data From the Table
  removeTable() {
    const table = document.getElementById("city"),
      removeButton = document.getElementById("remove");
    removeButton.addEventListener("click", (e) => {
      table.innerHTML = "";
      this.displayform();
    });
  }

  // Add weather Animation
  weatherCondition(data) {
    const condition = document.getElementById("weather-condition");
    data.forEach((i) => {
      // Animation If its Haze
      if (i.main === "Haze" || i.main === "Smoke" || i.main === "Mist") {
        condition.innerHTML = `<div class="icon sun-shower">
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="sun">
          <div class="rays"></div>
        </div>
      </div>`;
      }

      // Animation if its Raining
      if (i.main === "Rain") {
        condition.innerHTML = `<div class="icon rainy">
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="rain"></div>
      </div>`;
      }

      // If its Light or Moderate Rain
      if (
        (i.main === "Rain" && i.description === "light rain") ||
        (i.main === "Rain" && i.description === "moderate rain")
      ) {
        condition.innerHTML = `<div class="icon sun-shower">
        <div class="cloud"></div>
        <div class="sun">
          <div class="rays"></div>
        </div>
        <div class="rain"></div>
      </div>`;
      }

      // Drizzling
      if (i.main === "Drizzle") {
        condition.innerHTML = `<div class="icon thunder-storm">
        <div class="cloud"></div>
        <div class="lightning">
          <div class="bolt"></div>
          <div class="bolt"></div>
        </div>
      </div>`;
      }

      // Clouds
      if (i.main === "Clouds") {
        condition.innerHTML = `<div class="icon cloudy">
        <div class="cloud"></div>
        <div class="cloud"></div>
        <div class="cloud"></div>
      </div>`;
      }

      // Snow
      if (i.main === "Snow") {
        condition.innerHTML = `<div class="icon flurries">
         <div class="cloud"></div>
         <div class="snow">
           <div class="flake"></div>
           <div class="flake"></div>
         </div>
       </div>`;
      }

      // Clear
      if (i.main === "Clear") {
        condition.innerHTML = `<div class="icon sunny">
        <div class="sun">
          <div class="rays"></div>
        </div>
      </div>`;
      }
    });
  }

  // Load Hourly Weather Panel
  loadPanel(data, data2, data3) {
    const hourInfo = document.getElementById("hourly-info");

    // Data of Next Five hours
    const hourlyData = [];
    for (let index = 2; index < 7; index++) {
      hourlyData.push(data3[index]);
    }

    data2.forEach((i) => {
      hourInfo.innerHTML = `
    <table class="text-light text-family-Nunito text-small">
          <tr>
            <th>${this.convertUnixHours(data.dt)} ${this.getAMPM(
        this.convertUnixHours(data.dt)
      )}</th>
            <th>${this.convertUnixHours(hourlyData[0].dt)} ${this.getAMPM(
        this.convertUnixHours(hourlyData[0].dt)
      )}</th>
            <th>${this.convertUnixHours(hourlyData[1].dt)} ${this.getAMPM(
        this.convertUnixHours(hourlyData[1].dt)
      )}</th>
            <th>${this.convertUnixHours(hourlyData[2].dt)} ${this.getAMPM(
        this.convertUnixHours(hourlyData[2].dt)
      )}</th>
            <th>${this.convertUnixHours(hourlyData[3].dt)} ${this.getAMPM(
        this.convertUnixHours(hourlyData[3].dt)
      )}</th>
            <th>${this.convertUnixHours(hourlyData[4].dt)} ${this.getAMPM(
        this.convertUnixHours(hourlyData[4].dt)
      )}</th>
          </tr>
          <tr>
            <td>${this.getWeatherIcon(i.icon)}</td>
            <td>${this.getWeatherIcon(hourlyData[0].weather[0].icon)}</td>
            <td>${this.getWeatherIcon(hourlyData[1].weather[0].icon)}</td>
            <td>${this.getWeatherIcon(hourlyData[2].weather[0].icon)}</td>
            <td>${this.getWeatherIcon(hourlyData[3].weather[0].icon)}</td>
            <td>${this.getWeatherIcon(hourlyData[4].weather[0].icon)}</td>
          </tr>
          <tr>
            <th>${this.getTempByCels(data.temp)} &degC</th>
            <th>${this.getTempByCels(hourlyData[0].temp)} &degC</th>
            <th>${this.getTempByCels(hourlyData[1].temp)} &degC</th>
            <th>${this.getTempByCels(hourlyData[2].temp)} &degC</th>
            <th>${this.getTempByCels(hourlyData[3].temp)} &degC</th>
            <th>${this.getTempByCels(hourlyData[4].temp)} &degC</th>
          </tr>
        </table>`;
    });
  }

  hideform() {
    const form = document.getElementById("frm1");
    const header = document.getElementById("header");
    form.style.display = "none";
    header.style.display = "none";
  }

  displayform() {
    const form = document.getElementById("frm1");
    const header = document.getElementById("header");
    form.style.display = "block";
    header.style.display = "block";
    document.getElementById("nav").style.display = "none";
  }

  /* --------Utility Methods-------- */

  // Get AM/PM
  getAMPM(hrs) {
    if (hrs < 12) {
      return "Am";
    } else {
      return "Pm";
    }
  }

  // Get Temprature in Celcies
  getTempByCels(temp) {
    const tempInCels = Math.round(temp - 273);
    return tempInCels;
  }

  // Converting Unix Timestamp into Normal Human Redable Form
  convertUnixTime(unixTime) {
    var dt = new Date(unixTime * 1000);
    var hours = dt.getHours().toString().padStart(2, 0);
    var min = dt.getMinutes().toString().padStart(2, 0);
    var sec = dt.getSeconds().toString().padStart(2, 0);
    return `${hours}:${min}:${sec}`;
  }

  // Get Unix Hours Converted to Readable Hours
  convertUnixHours(unixTime) {
    var dt = new Date(unixTime * 1000);
    var hours = dt.getHours().toString().padStart(2, 0);
    return hours;
  }

  // Get Unix Minutes Converted to Readable Hours
  convertUnixMin(unixTime) {
    var dt = new Date(unixTime * 1000);
    var min = dt.getMinutes().toString().padStart(2, 0);
    return min;
  }

  // Get Latitude
  getLatitude(data) {
    const lat = data.coord.lat;
    return lat;
  }

  // Get Logitude
  getLongitude(data) {
    const lon = data.coord.lon;
    return lon;
  }

  // Get Weather Icon
  getWeatherIcon(iconCode) {
    const img = `<img src="http://openweathermap.org/img/w/${iconCode}.png" />`;
    return img;
  }

  //Alert Box Funtion
  showalert(msg) {
    const alert = document.getElementById("alert");
    alert.style.display = "flex";
    alert.innerHTML = `<span>${msg}</span><i class="fa fa-exclamation-triangle fa-lg" aria-hidden="true"></i>`;
    setTimeout(() => {
      alert.innerHTML = "";
      alert.style.display = "none";
      console.clear();
    }, 3500);
  }

  //Clear Text box
  cleartext() {
    this.txt.innerHTML = "";
  }
}
