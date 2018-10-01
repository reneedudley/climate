import { createSelector } from 'reselect';

export const getCityState = state => {
    return state.city;
};

export const getCities = createSelector(
    getCityState,
    cityState => cityState.get('cities')
);

export const getCityListHydrated = createSelector(
    getCityState,
    cityState => cityState.get('hydrated')
);

export const getCityListLoading = createSelector(
    getCityState,
    cityState => cityState.get('loading')
);

export const getCityPanelIsExpanded = createSelector(
    getCityState,
    cityState => cityState.get('expanded')
);

export const getCitySearchValue = createSelector(
    getCityState,
    cityState => cityState.get('searchValue')
);

export const getNotificationMessage = createSelector(
    getCityState,
    cityState => cityState.get('notificationMessage')
);

export const getCityListError = createSelector(
    getCityState,
    cityState => cityState.get('error')
);

export const isCityListReady = createSelector(
    getCityListHydrated,
    getCityListLoading,
    (hydrated, loading) => hydrated && !loading
);
