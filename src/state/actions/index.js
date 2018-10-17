export const startCameras = () => ({
    type: 'START_CAMERAS',
})
export const stopCameras = () => ({
    type: 'STOP_CAMERAS',
})
export const setAudioDevices = (devices) => ({
    type:'SET_AUDIO_DEVICES',
    devices,
})
