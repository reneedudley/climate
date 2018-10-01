import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Search from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

import { setSearchValue, getCityWeather } from '../Redux/city/city-actions';
import { getCitySearchValue } from '../Redux/city/city-selectors';


const CitySearch =({ onSetSearchValue, value, onGetCityWeather })=> {

    const renderSearchIcon=()=>{
        if (!value) return null;
        return (
            <Button type='submit' aria-label='Search for city and add to list'>
                <Search style={{color: '#E9D758'}} />
            </Button>
        )
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        onGetCityWeather(value);
    };

    return (
        <form style={{width: '50%'}} onSubmit={handleSubmit}>
            <TextField
                label={
                    <Typography style={{color: '#E9D758', fontSize: '1rem'}}>
                        Add a city by name or zip
                    </Typography>
                }
                fullWidth={true}
                value={value}
                InputProps={{endAdornment: renderSearchIcon()}}
                inputProps={{style: {color: 'white'}}}
                onChange={e => onSetSearchValue(e.target.value)}
                margin="normal"
            />
        </form>
    )
};

const mapDispatchToProps = (dispatch) => ({
    onSetSearchValue: (text) => {
      dispatch(setSearchValue(text))
    },
    onGetCityWeather: (search) => {
      dispatch(getCityWeather(search))
    },
});

const mapStateToProps = (state) => ({
    value: getCitySearchValue(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CitySearch);
