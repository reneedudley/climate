import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading =()=> {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <CircularProgress
                style={{ color: '#E9D758' }}
                size={70}
            />
        </div>
    )
};

export default Loading;


