const initialState = {
    recording: false,
    selectedMicrophones: [0],
    connectedCameras: [],
}

const app = (state = initialState, action) => {
    switch(action.type) {
        case 'UPDATE_APP_STATE':
            return action.newAppState
        default:
            return state;
    }
}

export default app
