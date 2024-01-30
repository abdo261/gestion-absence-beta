const UserRouter = require('express').Router()
const {create,login,update,remove, getAll, getById} = require('../controllers/userController')
const isAuth = require('../middlewares/isAuthenticated')
/**
 * @method post
 * @route /api/user/create
 * @access private (admin)
 * @descreption create responsable_user
 */
UserRouter.post('/create',isAuth,create)
/**
 * @method post
 * @route /api/user/login
 * @access public (admin,responsable)
 * @descreption login responsable_user or admin_user
 */
UserRouter.post('/login',login)
/**
 * @method put
 * @route /api/user/update/:id
 * @access private (admin)
 * @descreption update responsable_user or admin_user
 */
UserRouter.put('/update/:id',isAuth,update)
/**
 * @method delete
 * @route /api/user/remove/:id
 * @access private (admin)
 * @descreption remove responsable_user or admin_user
 */
UserRouter.delete('/remove/:id',isAuth,remove)
/**
 * @method get
 * @route /api/user/all
 * @access private (admin)
 * @descreption get all responsable_user 
 */
UserRouter.get('/all',isAuth,getAll)
/**
 * @method get
 * @route /api/user/one/:id
 * @access private (admin)
 * @descreption get one responsable_user 
 */
UserRouter.get('/one/:id',isAuth,getById)


module.exports = UserRouter