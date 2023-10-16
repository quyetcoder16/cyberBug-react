import { Editor } from '@tinymce/tinymce-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withFormik } from 'formik';


function FormEditProject(props) {

    const { arrProjectCategory } = useSelector(state => state.ProjectCartegoryReducer)

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

    const dispatch = useDispatch();
    const submitForm = (e) => {
        e.preventDefault();
        alert('submit edit');
    }

    //componentdidmount
    useEffect(() => {

        dispatch({ type: 'GET_ALL_PROJECT_CATEGORY_SAGA' })


        //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT_EDIT_PROJECT', submitFunction: handleSubmit });
    }, []);



    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    }

    return (
        <form className="container-fuild" onSubmit={handleSubmit}>
            <didiv className="row">
                <div className="col-4">

                    <div className="form-group">
                        <p className="font-weight-bold">Project id</p>
                        <input value={values.id} disabled className="form-control" name="id" />
                    </div>


                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project name</p>
                        <input value={values.projectName} onChange={handleChange} className="form-control" name="projectName" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <p className="font-weight-bold">Project Category</p>
                        <select
                            onChange={handleChange}
                            className="form-control" name="categoryId" value={values.categoryId}>
                            {arrProjectCategory?.map((item, index) => {
                                return <option key={index} value={item.id}>
                                    {item.projectCategoryName}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <p className="font-weight-bold">Description</p>
                        <Editor

                            name="description123"
                            initialValue={values.description}
                            value={values.description}

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
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>
            </didiv>
        </form >
    )
}


const EditProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { projectEdit } = props;

        return {
            id: projectEdit?.id,
            projectName: projectEdit.projectName,
            description: projectEdit.description,
            categoryId: projectEdit.categoryId
        }
    },
    validationSchema: Yup.object().shape({


    }),
    handleSubmit: (values, { props, setSubmitting }) => {

        // console.log('values', values);
        props.dispatch({
            type: 'UPDATE_PROJECT_SAGA',
            projectUpdate: values,
        })


    },
    displayName: 'EditProjectForm',
})(FormEditProject);

const mapStateToProps = (state) => ({

    projectEdit: state.ProjectReducer.projectEdit

})


export default connect(mapStateToProps)(EditProjectForm);