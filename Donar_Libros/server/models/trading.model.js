const mongoose = require('mongoose');
const { BookSchema } = require('../models/books.model');

const TradingSchema = new mongoose.Schema({
    book1: [BookSchema],
    book2: [BookSchema]
}, {timestamps:true});

const Trading = mongoose.model("Trading",TradingSchema);
module.exports = {TradingSchema,Trading}