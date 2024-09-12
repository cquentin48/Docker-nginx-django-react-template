import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class Router extends React.Component {
    render (): React.ReactNode {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<p>Bonjour!</p>} />
                    <Route path="/test" element={<p>Element de test!</p>} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;
