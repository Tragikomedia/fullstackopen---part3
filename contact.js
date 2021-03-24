const { model, Schema } = require("mongoose");

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

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

contactSchema.statics.fromReq = function (req) {
  const { name, number } = req.body;
  if (!name || !number)
    return { reqError: "You must provide both name and number" };
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
