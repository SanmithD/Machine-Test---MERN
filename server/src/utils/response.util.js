
export const Response = (code, success, msg, res, data = nul, token = null) =>{
    return res.status(code).json({
        success,
        message: msg,
        data,
        token
    });
}