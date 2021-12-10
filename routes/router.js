const express = require('express')
const router = express.Router()
const routes = require('../controller/user')


router.post("/", routes.create_User)

router.post("/login", routes.login_User)

router.post("/create", verifyToken, routes.create_Posts)

router.get("/get", routes.get_All_Posts)

router.post('/likes', verifyToken, routes.likes_dislikes)

router.get('/', routes.get_All_Likes_Dislike)

router.get('/:post_id', routes.get_Likes_Dislikes_By_Id)

module.exports = router