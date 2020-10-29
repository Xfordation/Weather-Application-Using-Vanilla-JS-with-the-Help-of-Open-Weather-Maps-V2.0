/**
 *
 * @author Xfordation
 * @version 2.0.0
 * @summary Simple Weather Application Made with the Hel of OpenWeatherMaps
 * @license MIT
 *
 */

// Init Weather Class
const wea = new weather();

//Init UI Class
const ui = new UI();

//On Submit Button
const frm = document.getElementById("frm1");
frm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = document.getElementById("t1").value;
  if (val !== "") {
    wea.getCity(val).then((data) => {
      if (data.city.message === "city not found") {
        //alert
        var msg = `City not Found`;
        ui.showalert(msg);
      } else {
        //UI Display
        ui.hideform();
        // Function to Display Weather Condition
        ui.showcity(data.city.weather);

        //Function to Display Temprature
        ui.showtemp(data.city.main);

        // Function to Display Detailed Weather Information
        ui.displayTable(
          data.city.sys,
          data.city.main,
          data.city.wind,
          data.city
        );

        // Add Animation According to the Weather Condition
        ui.weatherCondition(data.city.weather);

        // Clearing Text Field
        document.getElementById("t1").value = "";
      }
      // Get Coords
      const lat = ui.getLatitude(data.city);
      const lon = ui.getLongitude(data.city);

      // Calling function to get Hourly Update
      wea.getHourlyData(lat, lon).then((dta) => {
        ui.loadPanel(
          dta.hour.current,
          dta.hour.current.weather,
          dta.hour.hourly
        );
      });
    });
  } else {
    // Alert MEssage if text box is left empty
    msg = `Search Box Empty`;
    ui.showalert(msg);
  }
});
