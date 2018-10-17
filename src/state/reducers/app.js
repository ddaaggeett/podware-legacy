const initialState = {
    recording: false,
    audioDevices: [0],
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
        case 'SET_AUDIO_DEVICES':
            return {
                ...state,
                audioDevices: action.devices,
            }
        default:
            return state;
    }
}

export default app
