const express = require('express');
const router = express.Router();
const MemberBL = require('../../models/members/membersBL');

router.get('/', MemberBL.getAllMembers);
router.get('/:id', MemberBL.getMemberById);
router.post('/', MemberBL.createMember);
router.put('/:id', MemberBL.updateMember);
router.delete('/:id', MemberBL.removeMember);


module.exports = router;