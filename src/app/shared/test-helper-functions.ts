import { DebugElement } from "@angular/core";
import { MockedComponentFixture, ngMocks } from "ng-mocks";

/**
 * Finds an element inside the Component by the given `data-testid` attribute.
 * Throws an error if no element was found.
 *
 * @param fixture Mocked Component Fixture
 * @param testId Test id set by `data-testid`
 *
 */
export function findEl<T>(fixture: MockedComponentFixture<T>, testId: string): DebugElement {
    return ngMocks.find(['data-testid', testId]);
}

/**
 * Makes a fake click event that provides the most important properties.
 * Sets the button to left.
 * The event can be passed to DebugElement#triggerEventHandler.
 *
 * @param target Element that is the target of the click event
 */
export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
    return {
        preventDefault(): void { },
        stopPropagation(): void { },
        stopImmediatePropagation(): void { },
        type: 'click',
        target,
        currentTarget: target,
        bubbles: true,
        cancelable: true,
        button: 0,
    };
}
/**
 * Emulates a left click on the element with the given `data-testid` attribute.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 */
export function click<T>(fixture: MockedComponentFixture<T>, testId: string): void {
    const element = findEl(fixture, testId);
    const event = makeClickEvent(element.nativeElement);
    element.triggerEventHandler('click', event);
}


