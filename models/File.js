const mongoose = require('mongoose');


const fileSchema = mongoose.Schema({
    key:{type: String, required:true},
    size: Number,
    mimetype: String,
    createdBy: {type:mongoose.Type.objectId,ref:'user'}
},{timestamps:true});

const File = mongoose.model('file',fileSchema);

module.exports = File;