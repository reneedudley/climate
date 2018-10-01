'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { hydrateCityList } from '../Redux/city/city-actions';
import { isCityListReady, getCityListError } from '../Redux/city/city-selectors';
import Loading from './Loading';
import CityList from './CityList';
import CitySearch from './CitySearch';
import Notification from './Notificaton';


class HomePage extends React.Component {
    componentDidMount() {
        const { onHydrateCityList } = this.props;
        onHydrateCityList();
    }

    renderCityList() {
        const { ready, error } = this.props;
        if (!ready) return <Loading/>;

        if (error) return (
            <Typography
                variant="display1"
                gutterBottom
                style={{color: '#E9D758', fontWeight: 600, textAlign: 'center'}}
            >
                {error}
            </Typography>
        );

        return (
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <CitySearch/>
                <CityList/>
            </div>
        )
    }

    render(){

        return (
            <a style={{
                height: '100%', background: '#4F6367',
                display: 'flex', justifyContent: 'flex-start',
                alignItems: 'center', flexDirection: 'column'}}
            >
                <Typography
                    variant="display3"
                    gutterBottom
                    style={{color: '#E9D758', fontWeight: 600, textAlign: 'center'}}
                >
                    Climate
                </Typography>

                {this.renderCityList()}
                <Notification/>
            </a>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHydrateCityList: () => {
      dispatch(hydrateCityList())
    },
  }
};

const mapStateToProps = (state) =>({
    ready: isCityListReady(state),
    error: getCityListError(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);


