const Category = require('../models/Category');
const Place = require('../models/Place');

async function getAllCategories(req, res) {
    try {
        const response = await Category.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

async function getCategoryById(req, res) {
    try {
        const response = await Category.findById(req.params.id);
        if (!response) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

async function createCategory(req, res) {
    try {
        const response = await Category.create(req.body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

async function updateCategory(req, res) {
    try {
        const response = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!response) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

async function deleteCategory(req, res) {
    try {
        const places = await Place.find({ categoryId: req.params.id });
        if (places.length > 0) {
            return res.status(400).json({message: "Cannot delete categories with associated places"});
        };

        const response = await Category.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({message: "Category not found"});
        }
        res.status(200).json({message: "Category deleted"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };