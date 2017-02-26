import mongoose from 'mongoose';

const shoppingItem = new mongoose.Schema({
  name: String,
  completed: Boolean
});

const ShoppingItemModel = mongoose.model('ShoppingItem', shoppingItem);

const listSchema = new mongoose.Schema({
  name: String,
  creator: String,
  assignedUsers: Array,
  shoppingItems: [ shoppingItem ]
});

listSchema.methods.removeShoppingItem = function removeShoppingItem(
  id
) {
  this.shoppingItems = this.shoppingItems.filter(
    item => item._id != id
  );
};

listSchema.methods.addShoppingItem = function addShoppingItem(item) {
  this.shoppingItems.push(item);
  return this.shoppingItems[this.shoppingItems.length - 1];
}

listSchema.methods.updateShoppingItem = function updateShoppingItem(
  id,
  updatedItem
) {
  const item = this.shoppingItems.find(item => item.id === id);
  Object.assign(item, updatedItem);
  return item;
};

const List = mongoose.model('List', listSchema);

export default List;
