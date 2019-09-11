import React from 'react';
import Fragment from '../../../hoc/Fragment'
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((igKey) => (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{props.ingredients[igKey]}
            </li>
        ));
    return (
        <Fragment>
            <h3>Your Order Summary.</h3>
            <p>Your delicious burger is ready with following ingredients.</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price is: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Fragment>
    );
}

export default orderSummary;