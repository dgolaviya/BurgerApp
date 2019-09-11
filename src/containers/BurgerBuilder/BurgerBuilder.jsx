import React from 'react';
import { connect } from 'react-redux';
import Fragment from '../../hoc/Fragment';
import axios from '../../axios';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/index';

export class BurgerBuilder extends React.Component {
    state = {
        isPurchasable: false,
        purchasing: false
    };

    componentDidMount() {
        this.props.initIngredients();
    }

    updatePurchasable = (updatedIngredients) => {
        const sum = Object.keys(updatedIngredients).map(
            (igKey) => {
                return updatedIngredients[igKey]
            }).reduce((sum, el) => sum + el, 0)

        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
        
    };

    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    };

    continuePuchaseHandler = () => {
        this.props.history.push('/checkout');
        this.props.onInitPurchase();
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let i in disabledInfo) {
            disabledInfo[i] = disabledInfo[i] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>
            Something went wrong.
        Burger ingredients can't be loaded.</p> : <Spinner />;

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabledInfo={disabledInfo}
                        price={this.props.price}
                        orderd={this.purchaseHandler}
                        isAuth = {this.props.isAuthenticated}
                        isPurchasable={this.updatePurchasable(this.props.ings)}
                    />
                </Fragment>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.cancelPurchaseHandler}
                price={this.props.price}
                purchaseContinue={this.continuePuchaseHandler} />;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing}
                    modalClosed={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingsName) => dispatch(actionTypes.addIngredient(ingsName)),
    onIngredientRemoved: (ingsName) => dispatch(actionTypes.removeIngredient(ingsName)),
    initIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => dispatch(actionTypes.onInitPurchase()),
    setAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));