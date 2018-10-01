import React from 'react';
import { connect } from 'react-redux';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { getCityPanelIsExpanded } from '../Redux/city/city-selectors';

const CityListItem = ({handleExpandChange, city, index, handleCityDelete, expanded})=> {
    const id = city.get('id');

    const handleChange=(event, expanded)=>{
        if (handleExpandChange) {
            handleExpandChange(id,expanded)
        }
    };

    const handleDelete=()=>{
        if (handleCityDelete) {
            handleCityDelete(index)
        }
    };
    const iconUrl = `http://openweathermap.org/img/w/${city.getIn(['weather', 0,'icon'])}.png`;

    const detailTextStyle = {
        fontWeight: 500,
        fontSize: '18px',
        color: 'rgb(77, 100, 105)'
    };

    return (
        <ExpansionPanel expanded={expanded == id} onChange={handleChange}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <img
                        alt={`${city.getIn(['weather', 0, 'description'])}`}
                        src={iconUrl}
                    />
                    <Typography
                        variant="subheading"
                        style={{fontWeight: 500}}
                    >
                        {city.get('name')}: &nbsp;
                    </Typography>
                    <Typography variant="subheading">
                        {city.getIn(['main', 'temp'])}&ordm;
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-evenly'}}
                >
                    <Typography style={detailTextStyle}>
                        {`High: ${city.getIn(['main', 'temp_max'])}`}&ordm;
                    </Typography>
                    <Typography style={detailTextStyle}>
                        {`Low: ${city.getIn(['main', 'temp_max'])}`}&ordm;
                    </Typography>
                    <Typography style={detailTextStyle}>
                        {`Humidity: ${city.getIn(['main', 'humidity'])}%`}
                    </Typography>
                </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={handleDelete}
                >
                    Delete From List
                </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    )
};

const mapDispatchToProps = (dispatch) => ({
    onClick: (arr) => {
      dispatch((arr))
    },
});

const mapStateToProps = (state) => ({
    expanded: getCityPanelIsExpanded(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CityListItem);
