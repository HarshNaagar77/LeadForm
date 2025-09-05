const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
  const { name, email, phone, source } = req.body;
  const lead = new Lead({ name, email, phone, source });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 50, q } = req.query;
    const filter = {};
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [{ name: re }, { email: re }, { phone: re }, { source: re }];
    }
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page-1)*limit)
      .limit(parseInt(limit));
    const total = await Lead.countDocuments(filter);
    res.json({ data: leads, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLead,
  deleteLead
};
