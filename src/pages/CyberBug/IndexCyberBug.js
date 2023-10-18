import React from 'react'
import HeaderMainCyberBug from './MainCyberBug/HeaderMainCyberBug'
import InfoMainCyberBug from './MenuCyberBug/InfoMainCyberBug'
import ContentMainCyberBug from './MenuCyberBug/ContentMainCyberBug'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function IndexCyberBug(props) {

    const dispatch = useDispatch();
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    console.log(projectDetail);
    useEffect(() => {
        const { projectId } = props.match.params;
        dispatch({
            type: "GET_PROJECT_DETAIL",
            projectId
        })
    }, []);

    return (
        <div className='main'>
            <HeaderMainCyberBug />
            <InfoMainCyberBug />
            <ContentMainCyberBug />
        </div>
    )
}
