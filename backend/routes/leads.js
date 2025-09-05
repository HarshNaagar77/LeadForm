const express = require('express');
const router = express.Router();

const { createLead, getLeads, getLead, deleteLead } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads);
router.get('/:id', getLead);
router.delete('/:id', deleteLead);

module.exports = router;
