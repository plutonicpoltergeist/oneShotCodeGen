const { Prompt, Rating, User, Chain } = require('../models');
const create = async (req, res) => {try {const prompt = await Prompt.create({ ...req.body, UserId: req.user.id });res.status(201).json(prompt);} catch (error) {res.status(400).json({ message: error.message })}};
const getAll = async (req, res) => {try {const prompts = await Prompt.findAll({include: [{model: Rating},{model: User,attributes: ['email']},{model: Chain}]});res.json(prompts);} catch (error) {res.status(500).json({ message: error.message })}};
const update = async (req, res) => {try {const prompt = await Prompt.findByPk(req.params.id);if (!prompt) return res.status(404).json({ message: 'Prompt not found' });if (prompt.UserId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });await prompt.update(req.body);res.json(prompt);} catch (error) {res.status(400).json({ message: error.message })}};
const remove = async (req, res) => {try {const prompt = await Prompt.findByPk(req.params.id);if (!prompt) return res.status(404).json({ message: 'Prompt not found' });if (prompt.UserId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized' });await prompt.destroy();res.status(204).send();} catch (error) {res.status(500).json({ message: error.message })}};
module.exports = { create, getAll, update, remove };