import React from "react";
import { render } from "@testing-library/react";
import App from "../main/app/App";
import renderer from "react-test-renderer";

test("Is App component is correctly rendered", ()=>{
    // Given
    let tree:renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null;

    // Acts
    tree = renderer.create(<App/>).toJSON();

    // Asserts
    expect(tree).toMatchSnapshot();
});

test("App component static methods", () => {
    // Acts
    render(<App />);

    // Expects
    expect(App.displayNotification != null);
    expect(App.isComponentReady != null);
});

test("Is App Component Ready", () => {
    // Acts
    render(<App />);

    // Expects
    expect(App.isComponentReady()).toBe(true);
});
