import React, { useState } from 'react'

import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { GET_ALL_PROJECT_SAGA } from '../../../redux/types/cyberBugConstant/ProjectCyberConstants';
import { GET_TASK_TYPE_SAGA } from '../../../redux/types/cyberBugConstant/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/types/cyberBugConstant/PriorityConstants';
import { withFormik } from 'formik';
import * as Yup from 'yup'

function FormCreateTask(props) {


    const { arrProject } = useSelector(state => state.ProjectCyberBugsReducer);
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { userSearch } = useSelector(state => state.UserLoginCyberBugReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA });
        dispatch({ type: GET_TASK_TYPE_SAGA });
        dispatch({ type: GET_ALL_PRIORITY_SAGA });
        dispatch({
            type: 'GET_USER_API',
            keyWord: '',
        })
    }, []);


    const [timeTracking, setTimetracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })
    const userOptions = userSearch.map((user) => {
        return {
            label: user.name,
            value: user.userId,
        }
    })



    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setFieldValue
    } = props;

    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className="form-control" onChange={handleChange}>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task name</p>
                <input name="taskName" className="form-control" onChange={handleChange} />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className="form-control" onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task type</p>
                        <select className="form-control" name="typeId" onChange={handleChange}>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            optionFilterProp='label'
                            placeholder="Please select"
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values);
                            }}
                            onSearch={(value) => {
                                // console.log(value);
                                dispatch({
                                    type: 'GET_USER_API',
                                    keyWord: value,
                                });
                            }}
                            options={userOptions}
                        />
                        <div className="row mt-3">
                            <div className="col-12">
                                <p>Original Estimate</p>
                                <input type="number" min="0" name="originalEstimate" defaultValue="0" className="form-control" height="30" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                        <Slider
                            max={Number(timeTracking.timeTrackingRemaining) + Number(timeTracking.timeTrackingSpent)}
                            value={Number(timeTracking.timeTrackingSpent)}
                            defaultValue={0}

                        />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className='row' style={{ marginTop: 5 }}>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    });
                                    setFieldValue('timeTrackingSpent', e.target.value);
                                }} />
                            </div>
                            <div className="col-6">
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimetracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    });
                                    setFieldValue('timeTrackingRemaining', e.target.value);
                                }} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className="form-group">
                <p>Description</p>
                <Editor
                    name="description"
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
                        setFieldValue("description", content)
                    }}
                />
            </div>
            <button className='btn btn-primary' type='submit'>submit</button>
        </form>
    )
}

const frmCreateTask = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            taskName: '',
            description: '',
            statusId: 1,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: 0,
            typeId: 0,
            priorityId: 0,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        console.log(values);
        props.dispatch({
            type: "CREATE_TASK_SAGA",
            taskObject: values,
        })

    },
    displayName: 'create task',
})(FormCreateTask);




export default connect()(frmCreateTask);