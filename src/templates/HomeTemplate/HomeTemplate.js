import React from 'react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../../components/Home/Header/Header';

export default function HomeTemplate(props) {
    const { Component, ...resPara } = props;
    return (
        <Route {...resPara} render={(propsRoute) => {
            return <>
                <Header />
                <Component {...propsRoute} />
            </>
        }} />
    )
}
