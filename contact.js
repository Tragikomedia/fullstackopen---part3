const { model, Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Name must be at least 3 characters long"],
  },
  number: {
    type: String,
    required: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/,
  },
});

contactSchema.plugin(uniqueValidator);

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

contactSchema.statics.fromArgv = function (argv) {
  const [name, number] = argv.slice(3, 5);
  if (!name || !number) return { err: "You must provide both name and number" };
  return { contact: new this({ name, number }) };
};

contactSchema.statics.findExisting = async function (name) {
  try {
    const existingContact = await this.findOne({ name });
    return { existingContact };
  } catch (error) {
    return { error };
  }
};

contactSchema.statics.fromReq = function (req) {
  const { name, number } = req.body;
  if (!name || !number)
    return {
      reqError: {
        name: "ReqError",
        message: "You must provide both name and number",
      },
    };
  return { contact: new this({ name, number }) };
};

contactSchema.statics.getAll = async function () {
  try {
    const contacts = await this.find({});
    return { contacts };
  } catch (error) {
    return { error };
  }
};

module.exports = model("Contact", contactSchema);
