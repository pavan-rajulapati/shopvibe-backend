const setCookie = (res, token, isProduction) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: isProduction, 
        maxAge: 24 * 60 * 60 * 1000, 
        sameSite: isProduction ? 'None' : 'Lax', 
    });
};
    
module.exports = setCookie;
