import React from 'react'
import HeaderMainCyberBug from './MainCyberBug/HeaderMainCyberBug'
import InfoMainCyberBug from './MenuCyberBug/InfoMainCyberBug'
import ContentMainCyberBug from './MenuCyberBug/ContentMainCyberBug'

export default function IndexCyberBug() {
    return (
        <div className='main'>
            <HeaderMainCyberBug />
            <InfoMainCyberBug />
            <ContentMainCyberBug />
        </div>
    )
}
