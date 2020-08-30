import React, { useEffect } from 'react';
import App from './App';
import * as actions from './redux/markers/actions';
import { useDispatch, useSelector } from 'react-redux';

const AppContainer = () => {
    const markers = useSelector((state) => state.markers.data);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.fetchMapMarkers());
    }, []);

    console.log('AppContainer:', markers);

    return <App markers={markers} />;
};

export default AppContainer;
