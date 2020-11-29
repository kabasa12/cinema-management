const express = require('express');
const router = express.Router();
const UsersDbBL = require('../../models/usersDb/usersDbBL');
const auth = require('../../models/auth/jwtAuth');

router.get('/', auth, UsersDbBL.getAllUsers);
router.get('/:id', UsersDbBL.getUserById);
router.get('/info/data',auth, UsersDbBL.getUserInfo);
router.post('/',auth, UsersDbBL.addUser);
router.post('/login',UsersDbBL.login );
router.post('/createAcc',UsersDbBL.createAccount);
router.put('/:id', auth,UsersDbBL.updateUser);
router.delete('/:id',auth, UsersDbBL.deleteUser);
router.delete('/logout/remove',auth,UsersDbBL.logOut)

module.exports = router;