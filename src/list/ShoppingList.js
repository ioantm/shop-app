import React from 'react';

export default function ShoppingList(props) {
    return (
        <div>
            <h2>Shopping List</h2>
            <p>This is shopping list with id {props.params.listId}</p>   
        </div>
    )
}