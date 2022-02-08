const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose);
mongoose.plugin(slug)

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true },
    description: String,
    img: String,
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    slug: { type: String, slug: "name", unique: true },
    videoId: { type: String, required: true },
    level: Number,
    deleted: Boolean,
    deletedAt: Date,
    desks: [{
        type: Schema.Types.ObjectId,
        ref: 'Desk'
    }]
}, {
    _id: false
});

// add plugin mongoose sequences
Course.plugin(AutoIncrement);

//add plugin mongoose delete
const mongoose_delete = require('mongoose-delete');
Course.plugin(mongoose_delete, {
    overrideMethods: 'all',
    deletedAt: true
});


module.exports = mongoose.model('Course', Course)