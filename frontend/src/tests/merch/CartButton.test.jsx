/*
    do we make another one for Dialog component?
    should I be grouping CartButton and Dialog component into one test module?








    '   
        chatgpt, what tests should I do based on this: 

        I have a cart button, when I click it, user selected size, color, and quantity that came from three components will be returned and passed to the Dialog component. 
        
        The Dialog component displays each unique item

        If cart button tries to pass an item (with same size and color) that is already in the shopping cart, 
        the quantity from ItemPage will be added to the quantity of Dialog component

        My guess is:
        CartButton.test.jsx will be see if the onClick attribute works
    '



    
*/

import { describe, it } from 'vitest';

describe('CartButton', () => {
  it.skip('should skip this test', () => {
    // Test code here
  });
});
