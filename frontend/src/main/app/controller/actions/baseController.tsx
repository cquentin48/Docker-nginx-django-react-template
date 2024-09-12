/* istanbul ignore file */
/**
 * Abstract controller class used for the MVC Pattern
 *
 * After each actions, the controller must call the function `update` from
 * the view component in order to send the result to the view, like this :
 * ```typescript
 * myMethod(value:number){
 *  i += 1
 *  view.update(i)
 * }
 * ```
 *
 * @see {@link BaseComponent} for the view component implementation for the react class component
 */
export abstract class BaseController {
    protected updateFunction: (result: string) => void;

    constructor (updateFunction: (result: string) => void) {
        this.updateFunction = updateFunction;
    }

    abstract act (result: string): void
}
