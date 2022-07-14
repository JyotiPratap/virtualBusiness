const mongoose = require('mongoose');

const Profile = new mongoose.Schema({

    Name: {
        type: String,
        required: true,
    },
    Designation: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        unique:true
    },
    emailId: {
        type: String,
        required: true,
        unique:true
    },
    websiteURL: {
        type: String,
        default: false
    },
    socialURLs: {
        type: [String],
        required: true
    },
    companyLogo:{
        type:String,
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
        }
}, { timestamps: true });

module.exports = mongoose.model('Profile_Db', Profile)