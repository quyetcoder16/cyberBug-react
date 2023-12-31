import { all } from "redux-saga/effects";
import * as ToDoListSaga from './ToDoListSaga';
import * as CyberBug from './CyberBug/CyberBugSaga'
import * as ProjectCategorySaga from './CyberBug/ProjectCategorySaga';
import * as ProjectCyberBugSaga from './CyberBug/ProjectCyberBugSaga';
import * as TaskTypeSaga from './CyberBug/TaskTypeSaga';
import * as PrioritySaga from './CyberBug/PrioritySaga';
import * as TaskSaga from './CyberBug/TaskSaga';
import * as StatusSaga from './CyberBug/StatusSaga';
import * as CommentSaga from './CyberBug/CommentSaga';
import * as UserSaga from './CyberBug/UserSaga';

export function* rootSaga() {
    yield all([
        ToDoListSaga.theoDoiAction(),
        ToDoListSaga.theoDoiAddTaskApi(),
        ToDoListSaga.theoDoiDeleteTask(),
        ToDoListSaga.theoDoiDoneTask(),
        ToDoListSaga.theoDoiRejectTask(),
        // solve cyberBug

        CyberBug.theoDoiSigninSaga(),
        CyberBug.theoDoiGetUserSaga(),
        CyberBug.theoDoiAddUserProject(),
        CyberBug.theoDoiRemoveUserFromProject(),
        CyberBug.theoDoiGetUserByProjectIdSaga(),

        // user sign up 

        UserSaga.theoDoiUserSignUpSaga(),
        // user management
        UserSaga.theoDoiGetAllUserSaga(),
        UserSaga.theoDoiDeleteUserSaga(),
        UserSaga.theoDoiGetUserByKeyWordSaga(),
        UserSaga.theoDoiEditUserSaga(),

        ProjectCategorySaga.theoDoiGetAllProjectCategory(),

        // project cyber bug

        ProjectCyberBugSaga.theoDoiCreateProjectSaga(),
        ProjectCyberBugSaga.theoDoiGetListProject(),
        ProjectCyberBugSaga.theoDoiUppdateProject(),
        ProjectCyberBugSaga.theoDoiDeleteProject(),
        ProjectCyberBugSaga.theoDoiGetProjectDetail(),
        ProjectCyberBugSaga.theoDoiGetAllProjectSaga(),

        // task type 
        TaskTypeSaga.theoDoiGetTaskTypeSaga(),

        // priority 

        PrioritySaga.theoDoiGetAllPriority(),

        // task saga

        TaskSaga.theoDoiCreateTaskSaga(),
        TaskSaga.theoDoiGetTaskDetail(),
        TaskSaga.theoDoiUpdateTaskStatusSaga(),
        TaskSaga.theoDoiHandleChangePostApi(),

        // status saga 

        StatusSaga.theoDoiGetAllStatusSaga(),

        // comment saga 

        CommentSaga.theoDoiGetAllCommentSaga(),
        CommentSaga.theoDoiDeleteCommentSaga(),
        CommentSaga.theoDoiAddCommentSaga(),
        CommentSaga.theoDoiUpdateCommentSaga(),


    ])
}