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

listSchema.methods.removeShoppingItem = function removeShoppingItem(id) {
  this.shoppingItems = this.shoppingItems.filter(item => item._id != id);
};

const List = mongoose.model('List', listSchema);

export default List;