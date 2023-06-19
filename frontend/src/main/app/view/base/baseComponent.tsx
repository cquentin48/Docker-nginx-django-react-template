/* istanbul ignore file */

import React from "react";
import { type BaseController } from "../../controller/actions/baseController";

/**
 * Base component abstract class for the react component class
 */
export abstract class BaseComponent<S, P, C extends BaseController> extends React.Component<P, S> {
    protected controller?: C;

    protected initController (controller: C): void {
        this.controller = controller;
    }

    abstract update (responseObject: object[]): void;
}
