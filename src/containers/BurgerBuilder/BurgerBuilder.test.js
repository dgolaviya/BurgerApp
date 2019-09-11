import React from 'react'
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('Test <BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => { }} />);
    });

    it('Should render <BuildControls> element when ingredientds received', () => {
        wrapper.setProps({ ings: { salad: 1 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

});