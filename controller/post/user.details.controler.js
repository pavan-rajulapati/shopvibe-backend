const userDetails = require('../../models/userDetails.model')
const setRedisCache = require('../../utils/setRedisCache')

const handleUserDetails = async(req, res)=>{
    const {firstName, lastName, gender, dateOfBirth, mobileNumber} = req.body;

    if(!firstName || !lastName || !gender || !dateOfBirth || !mobileNumber) {
        return res.json({success : false, message : "Fields required"})
    }

    const userId = req.user?._id;
    if(!userId){
        return res.json({success : false, message : "Unauthorized"})
    }

    try {
        const isDetailExist = await userDetails.findOne({userId})
        if(isDetailExist){
            return res.json({success : false, message : "Details already existed"})
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
        await setRedisCache(`userDetails:${userId._id}`, UserDetails, 60 * 60)

        res.json({success : true, message : "success"})
    } catch (error) {
        console.log(error)
        return res.json({success : false, message : "Internal Error"})
    }
}

module.exports = handleUserDetails