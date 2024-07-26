const initialState = {
    name: '홍길동',
};

export const userReducer = (currentState = initialState, action) => {
    if (currentState === undefined) {
        return { name: '홍길동' };
    }
    const newState = { ...currentState };
    if (action.type === 'USER') {
        newState.name = action.name;
    }
    return newState;
};