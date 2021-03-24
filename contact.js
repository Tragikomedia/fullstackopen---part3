const {model, Schema} = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
});

contactSchema.statics.fromArgv = function(argv) {
    const [name, number] = argv.slice(3,5);
    if (!name || !number) return {err: 'You must provide both name and number'};
    return {contact: new this({name, number})};
}

module.exports = model('Contact', contactSchema);