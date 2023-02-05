import React, {useState, useEffect} from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import Fade from '@mui/material/Fade';

export default function Loading(loading){
    useEffect(() =>{
        setLoading(loading);
    })
    const [isloading, setLoading] = useState(false);

    return(
        <Fade
        in={isloading.loading}
        style={{
            transitionDelay: isloading.loading ? '1ms' : '0ms',
        }}
        unmountOnExit
        >
            <LinearProgress />
        </Fade>
    )

}