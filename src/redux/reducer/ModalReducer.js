import React from "react";

const initialState = {
    component: <p>body default</p>
}

const ModalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_FORM': {
            // console.log(123);
            state.component = action.component;
            return { ...state };
        }

        default:
            return { ...state };
    }
}

export default ModalReducer;
