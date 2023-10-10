import React from 'react'
import stylingLoading from './LoadingComponent.module.css';
import { useSelector } from 'react-redux';

export default function LoadingComponent() {

    let { isLoading } = useSelector(state => state.LoadingReducer);

    if (isLoading) {
        return (
            <div className={stylingLoading.bgLoading}>
                <img src={require('../../../assets/imgLoading/loading.gif')} alt='' />
            </div>
        )
    } else {
        return '';
    }


}
