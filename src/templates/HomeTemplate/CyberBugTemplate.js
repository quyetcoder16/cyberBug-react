import React from 'react'
import { Route } from 'react-router-dom'
import SildeBarCyberBug from '../../pages/CyberBug/SildeBarCyberBug/SildeBarCyberBug';
import MenuCyberBug from '../../pages/CyberBug/MenuCyberBug/MenuCyberBug';
import ModalCyberBug from '../../pages/CyberBug/ModalCyberBug/ModalCyberBug';

export default function CyberBugTemplate(props) {
    const { Component, ...resPara } = props;
    return (
        <Route {...resPara} render={(propsRoute) => {
            return <>
                <div className='jira'>
                    <SildeBarCyberBug />
                    <MenuCyberBug />
                    <Component {...propsRoute} />
                    <ModalCyberBug />
                </div>
            </>
        }} />
    )
}
