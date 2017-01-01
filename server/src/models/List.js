import mongoose from 'mongoose';

const shoppingItem = new mongoose.Schema({
  name: String
});

const listSchema = new mongoose.Schema({
  name: String,
  creator: String,
  assignedUsers: Array,
  shoppingItems: [shoppingItem],
});

const List = mongoose.model('List', listSchema);

export default List;