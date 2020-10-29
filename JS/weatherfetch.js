class weather {
  constructor() {
    this.appid = "2a343257f8c94d8b908b1995aa9cd2be";
  }

  // Get City Name
  async getCity(cityname) {
    const cityResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${this.appid}`
    );
    const city = await cityResponse.json();
    return {
      city,
    };
  }

  //   Get Weather Details For Future Days and weeks
  async getHourlyData(lat, lon) {
    const hourlyResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily,alerts&appid=${this.appid}`
    );
    const hour = await hourlyResponse.json();
    return {
      hour,
    };
  }
}
