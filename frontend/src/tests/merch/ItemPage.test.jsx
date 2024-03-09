// Test After Development

/*
    I think I write tests better and faster with Test After Development 
    than Test Driven Development

    because I can see what I need to test based on my already built and functional component.
*/

/*
    The children of ItemPage.jsx should be tested based on what they are receiving and what they are doing to those received

    List variables or functions to test

    id
    itemName
    userColor
    varieties
    selectedColor
    setSelectedColor*
    sizeValue
    setSizeValue*
    quantity
    setQuantity*
    selectedVariety
    -should have three complete key-value pairs
    imageValue
    setImageValue
    cartItems
    setCartItems

    *FUNCTIONS
    (how many times is it expected to be called based on a given sequence of simulated 'interactions'?) 
    (what is expected return?) - set functions, NO. third-party functions or methods, NO? regular functions, YES.
    (if two or more conditional cases, test all of them)
*/

/*
    itemName

    it has the correct data type (string)
    it is rendered correctly
*/

/*
    userColor
*/

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItemPageDetails from '../../components/merch/common/ItemPageDetails';

describe('ItemPageDetails', () => {
    it('renders ItemPageDetails with correct props', () => {
        const testProps = {
            itemName: 'Test Item',
            selectedVariety: {
                price: 34.99
            }
        };

        render(<ItemPageDetails 
            itemName={testProps.itemName} 
            selectedVariety={testProps.selectedVariety}
        />);
        
        const mockDetailsText = screen.getByTestId('mockItemPageDetails').textContent;
        expect(mockDetailsText).toContain('Mock ItemPageDetails: Test Item - Price: $34.99');
    });
});

describe('real ItemPageDetails', () => {
    it('renders ItemPageDetails with correct props', () => {

        render(<ItemPageDetails itemName={'Test Item'} selectedVariety={34.99}/>);

        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
});

/*
// Button.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';



import Button from './Button';
// (1) - Checks an element's inner text 
test('renders a button with correct text', () => {
  // Render the Button component
  const { getByText } = render(<Button>Hello</Button>);

  // Assert that the button is rendered with the correct text
  expect(getByText('Hello')).toBeInTheDocument();
});
  






















// (2) - Checks X amount of times a function has been called
test('calls onClick prop when clicked', () => {
  const handleClick = jest.fn();
  // We grab the property getByText from render()
  const { getByText } = render(<Button onClick={handleClick}>Click me</Button>);
  // We make this test script click that button
  fireEvent.click(getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

































/* 

(3) - For testing function calls

preferences.js

const preferences = {
  savePreference(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getPreference(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
};

export default preferences;


import preferences from './preferences';

describe('preferences module', () => {
  test('saves and retrieves preferences from localStorage', () => {
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');

    preferences.savePreference('theme', 'dark');
    expect(setItemSpy).toHaveBeenCalledWith('theme', JSON.stringify('dark'));

    const theme = preferences.getPreference('theme');
    expect(getItemSpy).toHaveBeenCalledWith('theme');

    expect(theme).toEqual('dark');
    setItemSpy.mockRestore();
    getItemSpy.mockRestore();
  });
});


























// (4) - Unit testing example

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
export default Greeting;

// Greeting.test.jsx
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders the correct greeting message', () => {
  render(<Greeting name="Alice" />);
  expect(screen.getByText('Hello, Alice!')).toBeInTheDocument();
});







// (5) - Integration testing example




LoginForm.jsx

import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ username, password });
        }}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;


// LoginForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Assume App renders LoginForm and handles submission.

test('submits correct data from LoginForm', () => {
    const handleSubmit = jest.fn();
    render(<App onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
        target: { value: 'user123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
        target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Login'));

    expect(handleSubmit).toHaveBeenCalledWith({
        username: 'user123',
        password: 'password',
    });
});



// DropdownButton.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownButton from './DropdownButton'; // Import the DropdownButton component

describe('DropdownButton', () => {
  test('toggles dropdown menu when clicked', () => {
    // Render the DropdownButton component
    const { getByText, queryByText } = render(<DropdownButton />);
    
    // Click the button to open the dropdown menu
    fireEvent.click(getByText('Open Dropdown'));
    
    // Verify that the dropdown menu is displayed
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();

    // Click the button again to close the dropdown menu
    fireEvent.click(getByText('Open Dropdown'));

    // Verify that the dropdown menu is no longer displayed
    expect(queryByText('Option 1')).not.toBeInTheDocument();
    expect(queryByText('Option 2')).not.toBeInTheDocument();
  });
});



// DropdownButton.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownButton from './DropdownButton'; // Import the DropdownButton component

describe('DropdownButton', () => {
  test('toggles dropdown menu when clicked', () => {
    // Render the DropdownButton component
    const { getByText, queryByText } = render(<DropdownButton />);
    
    // Get a reference to the button
    const button = getByText('Open Dropdown');
    
    // Click the button to open the dropdown menu
    fireEvent.click(button);
    
    // Assert that the dropdown menu is displayed
    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();

    // Click the button again to close the dropdown menu
    fireEvent.click(button);

    // Assert that the dropdown menu is no longer displayed
    expect(queryByText('Option 1')).not.toBeInTheDocument();
    expect(queryByText('Option 2')).not.toBeInTheDocument();
  });
});

*/