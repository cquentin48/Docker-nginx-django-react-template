import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../main/app/App";
import ReactDOM from "react-dom";

test("renders learn react link", () => {
    const {container} = render(<App />);
    container.childNodes.forEach((singleNode)=>{
        console.log(singleNode.nodeValue)
    })
});
