export const sendCustomeSuccess = (res, payload, status) => {
    res.status(status).json({
        payload
    });
}

export const sendCustomeError = (res, errorMessage, status) => {
    res.status(status).json({
        errorMessage
    });
}