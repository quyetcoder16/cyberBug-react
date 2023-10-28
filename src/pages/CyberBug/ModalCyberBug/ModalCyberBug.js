import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser';
import { useEffect } from 'react';
import { GET_ALL_STATUS_SAGA } from '../../../redux/types/cyberBugConstant/StatusConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/types/cyberBugConstant/PriorityConstants';
import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, HANDLE_CHANGE_POST_API_SAGA, REMOVE_USER_ASSIGN, UPDATE_STATUS_TASK_SAGA } from '../../../redux/types/cyberBugConstant/TaskConstants';
import { GET_TASK_TYPE_SAGA } from '../../../redux/types/cyberBugConstant/TaskTypeConstants';
import { Editor } from '@tinymce/tinymce-react';
import { Select } from 'antd';
import { ADD_COMMENT_SAGA, DELETE_COMMENT_SAGA, UPDATE_COMMENT_SAGA } from '../../../redux/types/cyberBugConstant/CommentConstants';
import { USER_LOGIN } from '../../../util/constants/settingSytem';

export default function ModalCyberBug() {


    const dispatch = useDispatch();
    const { taskDetailModal } = useSelector(state => state.TaskReducer);
    // console.log(taskDetailModal);

    const { arrStatus } = useSelector(state => state.StatusReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { projectDetail } = useSelector(state => state.ProjectReducer);
    const { arrComment } = useSelector(state => state.CommentReducer);
    // console.log(arrComment);

    const [visibleEditor, setVisibleEditor] = useState(false);
    const [historyContent, setHistoryContent] = useState(taskDetailModal.description);
    const [content, setContent] = useState(taskDetailModal.description);

    // comment add
    const [visibleComment, setVisibleComment] = useState(false);
    const [contentComment, setContentComment] = useState("");

    // edit comment

    const [visibleCommentEdit, setVisibleCommentEdit] = useState({
        idComment: "-1",
        visible: false,
    });
    const [contentCommentEdit, setContentCommentEdit] = useState('');
    // const [historyCommentEdit, setHistoryCommentEdit] = useState("");

    useEffect(() => {
        dispatch({ type: GET_ALL_STATUS_SAGA, });
        dispatch({ type: GET_ALL_PRIORITY_SAGA, });
        dispatch({ type: GET_TASK_TYPE_SAGA });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;


        dispatch({
            type: HANDLE_CHANGE_POST_API_SAGA,
            actionType: CHANGE_TASK_MODAL,
            name,
            value
        })
    }

    const renderDescription = () => {
        const jsxDescription = ReactHtmlParser(taskDetailModal.description);
        return <div>
            {visibleEditor ? <div>
                <Editor
                    name="description"
                    initialValue={taskDetailModal.description}
                    init={{
                        selector: 'textarea#myTextArea',
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={(content, editor) => {
                        setContent(content);
                    }}
                />
                <button className='btn btn-primary m-2' onClick={() => {
                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: content
                    // })
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: content
                    })
                    setVisibleEditor(false)
                }}>Save</button>
                <button className='btn btn-default m-2' onClick={() => {
                    // dispatch({
                    //     type: CHANGE_TASK_MODAL,
                    //     name: 'description',
                    //     value: historyContent
                    // })
                    dispatch({
                        type: HANDLE_CHANGE_POST_API_SAGA,
                        actionType: CHANGE_TASK_MODAL,
                        name: 'description',
                        value: historyContent
                    })
                    setVisibleEditor(false);
                }}>Close</button>
            </div>
                : <div onClick={() => {

                    setHistoryContent(taskDetailModal.description);
                    setVisibleEditor(!visibleEditor);

                }}>{jsxDescription}</div>}
        </div>
    }

    const renderTimeTracking = () => {
        const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

        const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
        const percent = Math.round(Number(timeTrackingSpent) / max * 100)

        return <div>
            <div style={{ display: 'flex' }}>
                <i className="fa fa-clock" />
                <div style={{ width: '100%' }}>

                    <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow={Number(timeTrackingSpent)} aria-valuemin={Number(timeTrackingRemaining)} aria-valuemax={max} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="logged">{Number(timeTrackingSpent)}h logged</p>
                        <p className="estimate-time">{Number(timeTrackingRemaining)}h remaining</p>
                    </div>
                </div>


            </div>
            <div className="row">

                <div className="col-6">
                    <input className="form-control" name="timeTrackingSpent" onChange={handleChange} />
                </div>
                <div className="col-6">
                    <input className="form-control" name="timeTrackingRemaining" onChange={handleChange} />
                </div>
            </div>
        </div>
    }


    const renderComment = () => {
        const userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
        // console.log(userLogin);
        return <>
            <div className="block-comment" style={{ display: 'flex' }}>
                <div className="avatar">
                    <img src={userLogin.avatar} alt='' />
                </div>

                <div className="input-comment">
                    {(visibleComment) ? <div>
                        <Editor
                            name="comment"
                            init={{
                                selector: 'textarea#myTextArea',
                                initialValue: { contentComment },
                                height: 150,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={(content, editor) => {
                                setContentComment(content);
                            }}
                        />
                        <button className='btn btn-primary m-2' onClick={() => {
                            dispatch({
                                type: ADD_COMMENT_SAGA,
                                taskId: taskDetailModal.taskId,
                                contentComment: contentComment,
                            });
                            setVisibleComment(false);
                        }}>Save</button>
                        <button className='btn btn-default m-2' onClick={() => {
                            setContentComment("");
                            setVisibleComment(false);
                        }}>Cancel</button>
                    </div> : <button className='btn btn-light mb-4' onClick={() => {
                        setVisibleComment(!visibleComment);
                    }}>add a comment ... </button>}
                </div>
            </div>
            <div className="lastest-comment">
                {arrComment?.map((comment, index) => {
                    const jsxComment = ReactHtmlParser(comment.contentComment);
                    return <div key={index} className="comment-item">
                        <div className="display-comment" style={{ display: 'flex' }}>
                            <div className="avatar">
                                <img src={comment.user.avatar} alt={comment.user.avatar} />
                            </div>
                            <div>
                                <p style={{ marginBottom: 5 }}>
                                    {comment.user.name}
                                </p>
                                {(visibleCommentEdit.idComment === comment.id.toString() && visibleCommentEdit.visible) ? <>
                                    <div>
                                        <Editor
                                            name="comment edit"
                                            initialValue={comment.contentComment}
                                            init={{
                                                selector: 'textarea#myTextArea',
                                                height: 150,
                                                menubar: false,
                                                plugins: [
                                                    'advlist autolink lists link image charmap print preview anchor',
                                                    'searchreplace visualblocks code fullscreen',
                                                    'insertdatetime media table paste code help wordcount'
                                                ],
                                                toolbar:
                                                    'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                                            }}
                                            onEditorChange={(content, editor) => {
                                                setContentCommentEdit(content);
                                            }}
                                        />
                                        <button className='btn btn-primary m-2' onClick={() => {
                                            dispatch({
                                                type: UPDATE_COMMENT_SAGA,
                                                id: comment.id,
                                                contentComment: contentCommentEdit,
                                                taskId: taskDetailModal.taskId,
                                            })
                                            setVisibleCommentEdit({
                                                idComment: comment.id.toString(),
                                                visible: false,
                                            });
                                        }}>Save</button>
                                        <button className='btn btn-default m-2' onClick={() => {
                                            setVisibleCommentEdit({
                                                idComment: comment.id.toString(),
                                                visible: false,
                                            });
                                        }}>Close</button>
                                    </div>
                                </> : <div>
                                    <div style={{ marginBottom: 5 }}>
                                        {jsxComment}
                                    </div>
                                    <div>
                                        <span className='mr-2' style={{ color: '#929398', cursor: "pointer" }} onClick={() => {
                                            setContentCommentEdit(comment.contentComment);
                                            setVisibleCommentEdit({
                                                idComment: comment.id.toString(),
                                                visible: true,
                                            });
                                        }}>Edit</span>
                                        •
                                        <span className='ml-2' style={{ color: '#929398', cursor: "pointer" }} onClick={() => {
                                            dispatch({
                                                type: DELETE_COMMENT_SAGA,
                                                idComment: comment.id,
                                                taskId: taskDetailModal.taskId,
                                            })
                                        }}>Delete</span>
                                    </div>
                                </div>}

                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    }

    return (
        <div>
            {/* Search Modal */}
            <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModal" aria-hidden="true">
                <div className="modal-dialog modal-search">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="search-block">
                                <input className="search" />
                                <i className="fa fa-search" />
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>RECENT ISSUES</p>
                            <div style={{ display: 'flex' }}>
                                <div className="icon">
                                    <i className="fa fa-bookmark" />
                                </div>
                                <div>
                                    <p>cyberlearn</p>
                                    <p>BUG-238066</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Info Modal */}
            <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
                <div className="modal-dialog modal-info">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="task-title">
                                <i className="fa fa-bookmark" />
                                <select name='typeId' value={taskDetailModal.typeId} onChange={handleChange}>
                                    {arrTaskType?.map((tp, index) => {
                                        return <option key={index} value={tp.id}>{tp.taskType}</option>
                                    })}
                                </select>
                                <span>{taskDetailModal.taskName}</span>
                            </div>
                            <div style={{ display: 'flex' }} className="task-click">
                                <div>
                                    <i className="fab fa-telegram-plane" />
                                    <span style={{ paddingRight: 20 }}>Give feedback</span>
                                </div>
                                <div>
                                    <i className="fa fa-link" />
                                    <span style={{ paddingRight: 20 }}>Copy link</span>
                                </div>
                                <i className="fa fa-trash-alt=''" style={{ cursor: 'pointer' }} />
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-8">
                                        <p className="issue">This is an issue of type: Task.</p>
                                        <div className="description">
                                            <p>Description</p>
                                            {renderDescription()}
                                        </div>

                                        <div className="comment">
                                            <h6 style={{ fontWeight: 600 }}>Comment</h6>
                                            {renderComment()}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="status">
                                            <h6>STATUS</h6>
                                            <select name='statusId' className="custom-select" value={taskDetailModal.statusId} onChange={(e) => {
                                                handleChange(e);
                                                // dispatch({
                                                //     type: UPDATE_STATUS_TASK_SAGA,
                                                //     taskUpdateStatus: {
                                                //         taskId: taskDetailModal.taskId,
                                                //         statusId: e.target.value,
                                                //         projectId: taskDetailModal.projectId
                                                //     }
                                                // })
                                            }}>
                                                {arrStatus?.map((status, index) => {
                                                    return <option value={status.statusId} key={index} >{status.statusName}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="assignees">
                                            <h6>ASSIGNEES</h6>
                                            <div className='row'>
                                                {
                                                    taskDetailModal.assigness.map((user, index) => {
                                                        return <div className="col-6  mt-2 mb-2">
                                                            <div key={index} style={{ display: 'flex' }} className="item">
                                                                <div className="avatar">
                                                                    <img src={user.avatar} alt={user.avatar} />
                                                                </div>
                                                                <p className="name mt-1 ml-1">
                                                                    {user.name}
                                                                    <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                                        // dispatch({
                                                                        //     type: REMOVE_USER_ASSIGN,
                                                                        //     userId: user.id
                                                                        // })
                                                                        dispatch({
                                                                            type: HANDLE_CHANGE_POST_API_SAGA,
                                                                            actionType: REMOVE_USER_ASSIGN,
                                                                            userId: user.id
                                                                        })
                                                                    }} />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                                <div className='col-6 mt-2 mb-2'>
                                                    <Select
                                                        options={projectDetail.members?.filter(mem => {
                                                            let index = taskDetailModal.assigness?.findIndex(us => us.id === mem.userId);
                                                            if (index !== -1) {
                                                                return false;
                                                            }
                                                            return true;
                                                        }).map((mem, index) => {
                                                            return { value: mem.userId, label: mem.name };
                                                        })}
                                                        optionFilterProp="label"
                                                        style={{ width: '100%' }}
                                                        name="lstUser"
                                                        value="+ Add more"
                                                        className="form-control"
                                                        onSelect={(value) => {
                                                            if (value == '0') {
                                                                return;
                                                            }
                                                            let userSelected = projectDetail.members.find(mem => mem.userId == value);
                                                            userSelected = { ...userSelected, id: userSelected.userId };
                                                            //dispatchReducer
                                                            // dispatch({
                                                            //     type: CHANGE_ASSIGNESS,
                                                            //     userSelected
                                                            // })
                                                            dispatch({
                                                                type: HANDLE_CHANGE_POST_API_SAGA,
                                                                actionType: CHANGE_ASSIGNESS,
                                                                userSelected
                                                            })
                                                        }}>


                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="reporter">
                                            <h6>REPORTER</h6>
                                            <div style={{ display: 'flex' }} className="item">
                                                <div className="avatar">
                                                    <img src={require('../../../assets/img/download (1).jfif')} alt='' />
                                                </div>
                                                <p className="name">
                                                    Pickle Rick
                                                    <i className="fa fa-times" style={{ marginLeft: 5 }} />
                                                </p>
                                            </div>
                                        </div> */}
                                        <div className="priority" style={{ marginBottom: 20 }}>
                                            <h6>PRIORITY</h6>
                                            <select name='priorityId' className="form-control" value={taskDetailModal?.priorityId} onChange={(e) => {
                                                handleChange(e);
                                            }}>
                                                {arrPriority.map((item, index) => {
                                                    return <option key={index} value={item.priorityId}>{item.priority}</option>
                                                })}


                                            </select>
                                        </div>
                                        <div className="estimate">
                                            <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                            <input name='originalEstimate' onChange={handleChange} type="text" className="estimate-hours" value={taskDetailModal.originalEstimate} />
                                        </div>
                                        <div className="time-tracking">
                                            <h6>TIME TRACKING</h6>
                                            {renderTimeTracking()}
                                        </div>
                                        <div style={{ color: '#929398' }}>Create at a month ago</div>
                                        <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
