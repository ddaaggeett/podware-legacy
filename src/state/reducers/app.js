const initialState = {
    recording: false,
}

const app = (state = initialState, action) => {
    switch(action.type) {
        case 'START_CAMERAS':
            return {
                ...state,
                recording: true,
            }
        case 'STOP_CAMERAS':
            return {
                ...state,
                recording: false,
            }
        default:
            return state;
    }
}

export default app
