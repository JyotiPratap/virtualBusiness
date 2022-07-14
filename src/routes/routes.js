const express = require('express');
const router = express.Router();
const profileController = require('../Controller/Controller.js')

//User's APIs -> Authentication required.
router.post('/Profile', profileController.createProfile)
router.get('/Profile/:Profile_Id',profileController.getProfileById)

module.exports = router;