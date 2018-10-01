import service from './service';

export const fetchCityWeatherByName =  (params) => service(`https://api.openweathermap.org/data/2.5/weather`, params, 'GET');