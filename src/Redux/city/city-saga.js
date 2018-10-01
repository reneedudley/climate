import { fromJS, List } from 'immutable';
import { put, takeEvery, all , call, select} from 'redux-saga/effects';
import { GET_CITY_WEATHER, HYDRATE_CITY_LIST,
    addCityToList, cityListHydrated,
    cityListLoading, cityListSetError,
    expandCityPanel, setSearchValue,
    setNotificationMessage } from './city-actions';
import { fetchCityWeatherByName } from '../../Shared/api-calls';
import { getCities } from './city-selectors';
import { history } from '../../Components/App';

const uniqueCity =(existingCities, city) => existingCities.every(item => item.get('id') != city.id);

export function* getCityWeatherSaga(action) {
    try {
        const params = {};
        if (!isNaN(action.search)) {
            params.zip = `${action.search},US`;
        }else {
            params.q =  `${action.search},US`;
        }
        const city = yield call(fetchCityWeatherByName, params);
        const existingCities = yield select(getCities);

        if (!existingCities || !existingCities.size || uniqueCity(existingCities, city)) {
            yield put(addCityToList(fromJS(city)));
        }
        yield put(setSearchValue(''));
        history.push(`/${city.id}`);
    } catch (e) {
        if (action.displayError) {
            yield put(cityListSetError('Current weather is unable to be loaded at this time.'))
        } else {
            yield put(setNotificationMessage(`${e}`))
        }
    }
}

export const initialCities = [
    {search: 'New York,US', displayError: true},
    {search: 'San Francisco,US', displayError: true},
    {search: 'Salt Lake City,US', displayError: true}
];

export function* hydrateCityListSaga(action) {
    yield put(cityListLoading(true));
    yield all(initialCities.map(city => call(getCityWeatherSaga, city)));
    yield put(cityListHydrated(true));
    yield put(cityListLoading(false));
}

export function* handleRouteChange(action) {
    const id = action.payload.location.pathname.split('').slice(1).join('');
    if (id && !isNaN(id)) {
        yield put(expandCityPanel(id))
    } else {
        yield put(expandCityPanel(''));
    }
}

export function* citySaga() {
    yield all([
        takeEvery(GET_CITY_WEATHER, getCityWeatherSaga),
        takeEvery(HYDRATE_CITY_LIST, hydrateCityListSaga),
        takeEvery('@@router/LOCATION_CHANGE', handleRouteChange),
    ])
}