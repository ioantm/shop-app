import mongose from 'mongoose';

const shoppingListSchema = new mongose.Schema({
  name: String,
  items: Array,
  users: Array,
}, { timestamps: true });

export default mongose.model('ShoppingList', shoppingListSchema);
