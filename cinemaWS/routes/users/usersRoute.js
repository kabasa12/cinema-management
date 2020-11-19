const express = require('express');
const router = express.Router();
const UsersDbBL = require('../../models/usersDb/usersDbBL');
const auth = require('../../models/auth/jwtAuth');

router.get('/',UsersDbBL.getAllUsers);
router.get('/:id', UsersDbBL.getUserById);
router.post('/', UsersDbBL.addUser);
router.post('/login',UsersDbBL.login );
router.post('/createAcc',auth,UsersDbBL.createAccount);
router.put('/:id', auth,UsersDbBL.updateUser);
router.delete('/:id',auth, UsersDbBL.deleteUser);
router.delete('/logout/remove',UsersDbBL.logOut)

module.exports = router;