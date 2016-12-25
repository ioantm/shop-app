import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  name: String,
  creator: String,
  assignedUsers: Array,
  shoppingItems: Array,
});

const List = mongoose.model('List', listSchema);

export default List;