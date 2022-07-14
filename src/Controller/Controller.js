const validator = require("../utills/validator");
const profileModel = require("../Model/Profile.js")
const aws = require('../utills/aws')

const createProfile = async (req, res) => {
    try {
        let requestBody = req.body;
        let companyLogo = req.files

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Please provide valid request body" })
        }
        let { Name, Designation, companyName, contactNumber, emailId, websiteURL, socialURLs } = requestBody

        if (!validator.isValid(Name)) {
            return res.status(400).send({ status: false, message: "Name is required" })
        }
        if (!validator.isValid(Designation)) {
            return res.status(400).send({ status: false, message: "Designation is required" })
        }
        if (!validator.isValid(companyName)) {
            return res.status(400).send({ status: false, message: "companyName is required" })
        }
        if (!validator.isValid(contactNumber))
            return res.status(400).json({ status: false, msg: "contactNumber is required" });

        if (!/^[6789]\d{9}$/.test(contactNumber))
            return res.status(400).json({ status: true, msg: "please enter a valid 10 digit phone number", });

        let isPhoneUsed = await profileModel.findOne({ contactNumber });

        if (isPhoneUsed)
            return res.status(400).json({ status: false, msg: `${contactNumber} is already exists` });

        if (!validator.isValid(emailId))
            return res.status(400).json({ status: false, msg: "please provide the email" });

        let isEmailUsed = await profileModel.findOne({ emailId });

        if (isEmailUsed)
            return res.status(400).json({ status: false, msg: `${emailId} is already exists` });

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId))
            return res.status(400).json({ status: false, msg: "please provide a valid email address" });

        if (!validator.isValid(websiteURL)) {
            return res.status(400).send({ status: false, message: "websiteURL is required" })
        }
        if (!validator.isValid(socialURLs)) {
            return res.status(400).send({ status: false, message: "companyName is required" })
        }

        if (!(companyLogo && companyLogo.length > 0)) {
            return res.status(400).send({ status: false, msg: "Invalid request parameters. Provide companyLogo." });
        }

        companyLogo = await aws.uploadFile(companyLogo[0]);


        //object destructuring for response body.
        const newProfileData = {
            Name,
            Designation,
            companyName,
            contactNumber,
            emailId,
            websiteURL,
            socialURLs,
            companyLogo: companyLogo
        }
        const saveProfileDetails = await profileModel.create(newProfileData)
        return res.status(201).send({ status: true, message: "Profile added successfully.", data: saveProfileDetails })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error is : " + err })
    }
};

const getProfileById = async function (req, res) {
    try {
        const profileId = req.params.Profile_Id

        if (!validator.isValidObjectId(profileId)) {
            return res.status(400).send({ status: false, message: `${profileId} is not a valid profile Id` })
        }

        const profile = await profileModel.findOne({ _id: profileId, isDeleted: false });

        if (!profile) {
            return res.status(404).send({ status: false, message: `profile does not exists` })
        }
        return res.status(200).send({ status: true, message: 'profile found successfully', data: profile })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error is : " + err })
    }
};

module.exports.createProfile = createProfile
module.exports.getProfileById = getProfileById