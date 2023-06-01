import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function WebAPPRouter (props: {}): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<p>Bonjour!</p>} />
                <Route path="/test" element={<p>Element de test!</p>} />
            </Routes>
        </BrowserRouter>
    );
}
