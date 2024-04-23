import { model, Schema } from "mongoose";

const emailSchema = new Schema({
	email: String
});

const Email = model("Email", emailSchema);
export default Email;
