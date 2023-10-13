import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { withFormik } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { CREATE_PROJECT_SAGA, GET_ALL_PROJECT_CATEGORY_SAGA } from '../../../redux/types/cyberBugConstant/CyberBugConstants';

function CreateProjectCyberBug(props) {

    const { arrProjectCategory } = useSelector(state => state.ProjectCartegoryReducer);
    const dispatch = useDispatch();
    // console.log(arrProjectCategory);



    useEffect(() => {
        dispatch({
            type: GET_ALL_PROJECT_CATEGORY_SAGA,
        })
    }, []);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,

    } = props;


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content);
    }

    return (
        <div className='container mt-5'>
            <h3>CreateProject</h3>
            <form className="container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <p>Name</p>
                    <input onChange={handleChange} className="form-control" name="projectName" />
                </div>
                <div className="form-group">
                    <p>Description</p>
                    <Editor
                        name="description"
                        initialValue=""
                        init={{
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
                        onEditorChange={handleEditorChange}
                    />
                </div>
                <div className="form-group">
                    <select name="categoryId" onChange={handleChange} className="form-control">
                        {arrProjectCategory.map((item, index) => {
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className="btn btn-outline-primary" type="submit">Create project</button>
            </form>
        </div>
    )
}

const createProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            projectName: '',
            description: '',
            categoryId: props.arrProjectCategory[0]?.id
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_PROJECT_SAGA,
            newProject: values
        })

    },
    displayName: 'CreateProjectFormik',
})(CreateProjectCyberBug);

const mapStateToProps = (state) => ({
    arrProjectCategory: state.ProjectCartegoryReducer.arrProjectCategory
})

export default connect(mapStateToProps)(createProjectForm);