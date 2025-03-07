const initialState = {
    isOpen: false,
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MODAL_OPEN':
            return { ...state, isOpen: true };
        case 'MODAL_CLOSE':
            return { ...state, isOpen: false };
        default:
            return state;
    }
};