import React from 'react';
import { connect } from 'react-redux';

import { getCities } from '../Redux/city/city-selectors';
import { removeCity } from '../Redux/city/city-actions';
import { history } from './App';
import CityListItem from './CityListItem';

class CityList extends React.Component {
    state = {
        expanded: ''
    };

    handleChange = (id, expanded) => {
        history.push(`/${expanded ? id : ''}`)
    };

    handleDelete = key => {
        const { onRemoveCity } = this.props;
        history.push(`/`);
        onRemoveCity(key);
    };

    renderCities(){
        const { cities } = this.props;

        if (!cities) return null;

        return cities.map((city, key) => {
            return (
                <CityListItem
                    key={key}
                    index={key}
                    city={city}
                    handleExpandChange={this.handleChange}
                    handleCityDelete={this.handleDelete}
                />
            )
        })
    }
    render(){
        return (
            <div style={{width: '70%'}}>
                {this.renderCities()}
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => ({
    onRemoveCity: (index) => {
        dispatch(removeCity(index))
    },
});

const mapStateToProps = (state) => ({
    cities: getCities(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CityList);


