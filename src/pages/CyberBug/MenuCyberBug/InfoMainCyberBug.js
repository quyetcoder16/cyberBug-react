import React from 'react'

export default function InfoMainCyberBug(props) {

    const { projectDetail } = props;
    // console.log(projectDetail);

    const renderAvatar = () => {
        return projectDetail.members?.map((user, index) => {
            return <div className="avatar" key={index}>
                <img src={user.avatar} alt='1' />
            </div>
        });
    }

    return (
        <div>
            <h3>{projectDetail.projectName}</h3>
            <div className="info" style={{ display: 'flex' }}>

                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}

                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </div>

    )
}
