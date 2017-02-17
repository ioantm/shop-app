import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType
} from 'graphql';

import User from '../models/User';
import List from '../models/List';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user in shopping list',
  fields: {
    id: { type: GraphQLID, description: 'The id of the user' },
    email: { type: GraphQLString, description: 'User emal' },
    name: { type: GraphQLString, description: 'User name' },
    password: { type: GraphQLString, description: 'User password' }
  }
});

const shoppingItemType = new GraphQLObjectType({
  name: 'ShoppingItem',
  description: 'A shopping item from list',
  fields: {
    id: { type: GraphQLID, description: 'Shipping item id' },
    name: { type: GraphQLString, description: 'Shopping item name' },
    completed: {
      type: GraphQLBoolean,
      description: 'Whether a item is completed or not'
    }
  }
});

const listType = new GraphQLObjectType({
  name: 'List',
  description: 'List with shopping items',
  fields: {
    id: { type: GraphQLID, description: 'List id' },
    name: { type: GraphQLString, description: 'Shopping list name' },
    creator: {
      type: GraphQLString,
      description: 'Shopping list creator'
    },
    assignedUsers: {
      type: new GraphQLList(GraphQLString),
      description: 'users that can edit this list'
    },
    shoppingItems: {
      type: new GraphQLList(shoppingItemType),
      description: 'shopping items in list'
    }
  }
});

const shoppingItemInputType = new GraphQLInputObjectType({
  name: 'ShoppingItemInput',
  fields: {
    id: { type: GraphQLID, description: 'Shopping item id ' },
    name: { type: GraphQLString, description: 'Shopping item name' },
    completed: {
      type: GraphQLBoolean,
      description: 'Whether item is compelted or not'
    }
  }
});

const listInputType = new GraphQLInputObjectType({
  name: 'ListInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Shopping list name'
    },
    creator: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'List creator email'
    },
    assignedUsers: {
      type: new GraphQLList(GraphQLString),
      description: 'Optional list of users assigned to this list'
    },
    shoppingItems: {
      type: new GraphQLList(shoppingItemInputType),
      description: 'Optional list of shopping items'
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    createUser: {
      type: userType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'User email'
        },
        name: { type: GraphQLString, description: 'User name' },
        password: {
          type: GraphQLString,
          description: 'User password'
        }
      },
      resolve: (_, args) =>
        User.findOne({ email: args.email }).then(user => {
          if (user) {
            throw new Error('user already exists');
          } else {
            return new User({
              email: args.email,
              password: args.password,
              name: args.name
            }).save();
          }
        })
    },
    createList: {
      type: listType,
      args: { list: { type: new GraphQLNonNull(listInputType) } },
      resolve: (_, args) => new List(args.list).save()
    },
    updateShoppingItem: {
      type: shoppingItemType,
      args: {
        listId: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'List id'
        },
        item: {
          type: new GraphQLNonNull(shoppingItemInputType),
          description: 'Shopping item'
        }
      },
      resolve: (_, args) =>
        List
          .findById(args.listId)
          .then(
            (list) => {
              const updatedItem = list.updateShoppingItem(args.item.id, args.item);
              list.save();
              return updatedItem;
            }
          )
    }
  }
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    user: {
      type: userType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The id of the user'
        }
      },
      resolve: (_, args) => User.findById(args.id)
    },
    userByEmail: {
      type: userType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'The email of the user'
        }
      },
      resolve: (_, args) => User.findOne({ email: args.email })
    },
    list: {
      type: listType,
      args: {
        id: { type: GraphQLID, description: 'Shopping list id' }
      },
      resolve: (_, args) => {
        console.log('get list', args.id);
        return List.findById(args.id);
      }
    },
    lists: {
      type: new GraphQLList(listType),
      args: {
        creator: {
          type: GraphQLString,
          description: 'Email for the user who created the list'
        },
        ids: {
          type: new GraphQLList(GraphQLID),
          description: 'Ids of lists to load'
        }
      },
      resolve: (_, args, context) => {
        if (args.ids) {
          List.find({ _id: { $in: args.ids } });
        } else {
          return List.find({
            creator: args.creator || context.user.email
          });
        }
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

const lists = [
  {
    name: 'Cumaraturi',
    creator: 'ioan@yahoo.com',
    assignedUsers: [],
    shoppingItems: [ { name: 'lapte', completed: false } ]
  }
];
