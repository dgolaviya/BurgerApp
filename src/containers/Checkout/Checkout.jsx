import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './Contactdata/ContactData';

class Checkout extends React.Component {

    // state = {
    //     ingredients: null,
    //     price:0
    // }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = +param[1];
    //         }
    //         else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.setState({ ingredients: ingredients, price: price });
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased?<Redirect to="/" />:null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler}
                    />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    // render={(props) => <ContactData
                    //     ingredients={this.state.ingredients}
                    //     price={this.state.price}
                    //     {...props} />}
                    />
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => ({
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);