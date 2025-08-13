const Goal = require('../models/goals');

// @desc    Get all goals
// @route   GET /api/goals
const getGoals = async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
};

// @desc    Create a goal
// @route   POST /api/goals
const setGoal = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ message: 'Please add a text field' });
  }
  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(201).json(goal);
};

// @desc    Update a goal
// @route   PUT /api/goals/:id
const updateGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // return updated data
  });

  res.status(200).json(updatedGoal);
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  await goal.deleteOne();
  res.status(200).json({ message: `Deleted goal with id ${req.params.id}` });
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

