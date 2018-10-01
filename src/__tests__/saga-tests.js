import { put, call, all, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { getCityWeather, cityListLoading,
    cityListHydrated, expandCityPanel,
    hydrateCityList, addCityToList, setSearchValue } from '../Redux/city/city-actions';
import { hydrateCityListSaga, getCityWeatherSaga,
    initialCities, handleRouteChange } from '../Redux/city/city-saga';
import  { getCities } from '../Redux/city/city-selectors';
import { fetchCityWeatherByName } from '../Shared/api-calls';

const hydrateAction = hydrateCityList();

describe('hydrate saga', () => {
    const generator = cloneableGenerator(hydrateCityListSaga)(hydrateAction);

    test('starts the loading process', () => {
        expect(generator.next().value).toEqual(put(cityListLoading(true)));
    });

    test('calls the get city weather saga three times', () => {
        expect(generator.next().value).toEqual(all(initialCities.map(city => call(getCityWeatherSaga, city))))
    });

    test('ends the hydration and loading processes', () => {
        expect(generator.next().value).toEqual(put(cityListHydrated(true)));
        expect(generator.next().value).toEqual(put(cityListLoading(false)));
    });
});

const pushAction = {type: '@@router/LOCATION_CHANGE', payload: {location: {pathname: '/29392'}}};
const pushActionStringTest = {type: '@@router/LOCATION_CHANGE', payload: {location: {pathname: '/hello'}}};

describe('route change saga', () => {

    test('sets the expanded panel to the id, if the id is a number', () => {
        const generator = cloneableGenerator(handleRouteChange)(pushAction);
        expect(generator.next().value).toEqual(put(expandCityPanel('29392')));
    });

    test('resets the expanded panel if the id is not a number', () => {
        const generator = cloneableGenerator(handleRouteChange)(pushActionStringTest);
        expect(generator.next().value).toEqual(put(expandCityPanel('')));
    });
});

const getCityWeatherActionName = getCityWeather('Austin');
const getCityWeatherActionZip = getCityWeather('78664');

describe('city weather saga', () => {
    const generator = cloneableGenerator(getCityWeatherSaga)(getCityWeatherActionName);

    test('calls the weather api with a q param if the action sends a name', () => {
        expect(generator.next().value).toEqual(call(fetchCityWeatherByName, {q: `Austin,US`}));
    });

    test('calls the weather api with a zip param if the action sends a number', () => {
        const generatorZip = cloneableGenerator(getCityWeatherSaga)(getCityWeatherActionZip);
        expect(generatorZip.next().value).toEqual(call(fetchCityWeatherByName, {zip: `78664,US`}));
    });

    test(`if the city isn't on the list, it adds the city to the list`, () => {
        expect(generator.next().value).toEqual(select(getCities));
        expect(generator.next().value).toEqual(put(addCityToList()));
    });

    test(`resets the search value`, () => {
        expect(generator.next().value).toEqual(put(setSearchValue('')));
    });
});