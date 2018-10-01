import { Map, List } from 'immutable';

const initialCity = Map({
    cities: List(),
    loading: false,
    hydrated: false,
    error: '',
    expanded: '',
    searchValue: '',
    notificationMessage: ''
});

export default (cityState = initialCity, action) => {
    switch (action.type) {
        case 'ADD_CITY_TO_LIST': return cityState.setIn(['cities', cityState.get('cities').size], action.city);
        case 'CITY_LIST_HYDRATED': return cityState.set('hydrated', action.bool);
        case 'CITY_LIST_LOADING': return cityState.set('loading', action.bool);
        case 'CITY_LIST_SET_ERROR': return cityState.set('error', action.error);
        case 'EXPAND_CITY_PANEL': return cityState.set('expanded', action.panel);
        case 'SET_SEARCH_VALUE': return cityState.set('searchValue', action.value);
        case 'SET_NOTIFICATION_MESSAGE': return cityState.set('notificationMessage', action.message);
        case 'REMOVE_CITY': return cityState.set('cities', cityState.get('cities').delete(action.index));
        default: return cityState;
    }
};
