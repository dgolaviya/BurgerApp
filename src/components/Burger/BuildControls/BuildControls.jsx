import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];
const buildcontrols = props => (
  <div className={classes.BuildControls}>
  <p>Current Price <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map((item, index) => (
      <BuildControl
        key={index}
        label={item.label}
        added={() => props.ingredientsAdded(item.type)}
        removed={() => props.ingredientsRemoved(item.type)}
        disabled = {props.disabledInfo[item.type]}
      />
    ))}
    <button className={classes.OrderButton}
            disabled={!props.isPurchasable}
            onClick={props.orderd}>{props.isAuth?'Order Now':'Sign Up to order'}</button>
  </div>
);

export default buildcontrols;
