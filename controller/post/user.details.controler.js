const userDetails = require('../../models/userDetails.model')
const redisClient = require('../../middlewares/redis')
const sendResponse = require('./sendResponse')

const handleUserDetails = async(req, res)=>{
    const {firstName, lastName, gender, dateOfBirth, mobileNumber} = req.body;

    if(!firstName || !lastName || !gender || !dateOfBirth || !mobileNumber) {
        sendResponse(res, 400,'error', 'Fields Required' || 'Unknown Error')
    }

    const userId = req.user?._id;
    if(!userId){
        sendResponse(res, 401,'error', 'Unauthorized' || 'Unknown Error')
    }

    try {
        const isDetailExist = await userDetails.findOne({userId})
        if(isDetailExist){
            sendResponse(res, 302,'error', 'Details Already Existed' || 'Unknown Error')
        }

        const UserDetails = new userDetails({
            userId,
            firstName,
            lastName, 
            gender, 
            dateOfBirth, 
            mobileNumber
        })

        await UserDetails.save()
        await redisClient.setEx(`userDetails:${userId._id}`,60 * 60, JSON.stringify(UserDetails))

        sendResponse(res, 200,'success')
    } catch (error) {
        console.log(error)
        sendResponse(res, 500,'error', 'Internal Error' || 'Unknown Error')
    }
}

module.exports = handleUserDetails