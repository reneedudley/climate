export const addCityToList = (city) => ({
    type: 'ADD_CITY_TO_LIST',
    city
});

export const GET_CITY_WEATHER = 'GET_CITY_WEATHER';

export const getCityWeather = (search) => ({
    type: GET_CITY_WEATHER,
    search
});

export const HYDRATE_CITY_LIST = 'HYDRATE_CITY_LIST';

export const hydrateCityList = () => ({
    type: HYDRATE_CITY_LIST
});

export const cityListHydrated = (bool) => ({
    type: 'CITY_LIST_HYDRATED',
    bool
});

export const cityListLoading = (bool) => ({
    type: 'CITY_LIST_LOADING',
    bool
});

export const cityListSetError = (error) => ({
    type: 'CITY_LIST_SET_ERROR',
    error
});

export const expandCityPanel = (panel) => ({
    type: 'EXPAND_CITY_PANEL',
    panel
});

export const removeCity = (index) => ({
    type: 'REMOVE_CITY',
    index
});

export const setSearchValue = (value) => ({
    type: 'SET_SEARCH_VALUE',
    value
});

export const setNotificationMessage = (message) => ({
    type: 'SET_NOTIFICATION_MESSAGE',
    message
});


