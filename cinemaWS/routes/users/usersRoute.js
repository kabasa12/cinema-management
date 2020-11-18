const express = require('express');
const router = express.Router();
const UsersDbBL = require('../../models/usersDb/usersDbBL');
const AuthBL = require('../../models/auth/authBL');

router.get('/',UsersDbBL.getAllUsers);
router.get('/:id', UsersDbBL.getUserById);
router.post('/', UsersDbBL.addUser);
router.post('/login',UsersDbBL.login );
router.post('/createAcc',UsersDbBL.createAccount);
router.put('/:id', UsersDbBL.updateUser);
router.delete('/:id', UsersDbBL.deleteUser);

module.exports = router;