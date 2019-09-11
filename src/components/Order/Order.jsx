import React from 'react';
import classes from './Order.css'
const order = (props) => {
    const transformedingredients = [];
    for (let ingredientName in props.ingredients) {
        transformedingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }
    const ingredientOutput = transformedingredients.map(ig => {
        return <span
            key={ig.name}
            style={{
                margin:'0 8px',
                border:'1px solid #ccc',
                textTransform:'capitalize',
                display:'inline-block',
                padding:'5px'
            }}>{ig.name} ({ig.amount})</span>
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients {ingredientOutput}</p>
            <p>price:<strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;