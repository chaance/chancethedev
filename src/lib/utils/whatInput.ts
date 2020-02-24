import { canUseDOM } from '$lib/utils';

enum Inputs {
  Initial = 'initial',
  Mouse = 'mouse',
  Keyboard = 'keyboard',
  Touch = 'touch',
}

type PossibleEvent =
  | FocusEvent
  | KeyboardEvent
  | PointerEvent
  | MouseEvent
  | TouchEvent
  | WheelEvent;

type EventType = 'input' | 'intent';

const WHAT_INPUT = 'what-input';
const WHAT_INTENT = 'what-intent';
const INPUT = 'input';
const INTENT = 'intent';
const POINTER = 'pointer';

const noop = () => {};

export function whatInput() {
  if (!canUseDOM()) {
    return {
      // always return "initial" because no interaction will ever be detected
      ask: () => 'initial',
      element: () => null,
      ignoreKeys: noop,
      specificKeys: noop,
      registerOnChange: noop,
      unRegisterOnChange: noop,
    };
  }

  // cache document.documentElement
  let docElem = document.documentElement;

  // currently focused dom element
  let currentElement: string | null = null;

  // last used input type
  let currentInput: Inputs = Inputs.Initial;

  // last used input intent
  let currentIntent: Inputs = currentInput;

  // UNIX timestamp of current event
  let currentTimestamp = Date.now();

  // check for a `data-whatpersist` attribute on either the `html` or `body`
  // elements, defaults to `true`
  let shouldPersist: boolean | 'true' | 'false' = 'false';

  // form input types
  let formInputs = ['button', INPUT, 'select', 'textarea'];

  // empty array for holding callback functions
  let functionList: { type: EventType; fn: Function }[] = [];

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  let ignoreMap = [
    16, // shift
    17, // control
    18, // alt
    91, // Windows key / left Apple cmd
    93, // Windows menu / right Apple cmd
  ];

  let specificMap: any[] = [];

  // mapping of events to input types
  const inputMap = {
    keydown: Inputs.Keyboard,
    keyup: Inputs.Keyboard,
    mousedown: Inputs.Mouse,
    mousemove: Inputs.Mouse,
    MSPointerDown: POINTER,
    MSPointerMove: POINTER,
    pointerdown: POINTER,
    pointermove: POINTER,
    touchstart: Inputs.Touch,
    touchend: Inputs.Touch,
  };

  // boolean: true if the page is being scrolled
  let isScrolling = false;

  // store current mouse position
  const mousePos: { x: null | number; y: null | number } = {
    x: null,
    y: null,
  };

  // map of IE 10 pointer events
  const pointerMap = {
    2: Inputs.Touch,
    3: Inputs.Touch, // treat pen like touch
    4: Inputs.Mouse,
  };

  // check support for passive event listeners
  let supportsPassive = false;

  try {
    const opts = Object.defineProperty({}, 'passive', {
      // eslint-disable-next-line getter-return
      get: () => {
        supportsPassive = true;
      },
    });

    (window.addEventListener as any)('test', null, opts);
  } catch (e) {
    // fail silently
  }

  /*
   * set up
   */

  function setUp() {
    // add correct mouse wheel event mapping to `inputMap`
    inputMap[detectWheel()] = 'mouse';

    addListeners();
  }

  /*
   * events
   */

  function addListeners() {
    // `pointermove`, `MSPointerMove`, `mousemove` and mouse wheel event binding
    // can only demonstrate potential, but not actual, interaction
    // and are treated separately
    const options = supportsPassive ? { passive: true } : false;

    document.addEventListener('DOMContentLoaded', setPersist);

    // pointer events (mouse, pen, touch)
    if (window.PointerEvent) {
      window.addEventListener('pointerdown', setInput);
      window.addEventListener('pointermove', setIntent);
    } else if (window.MSPointerEvent) {
      window.addEventListener('MSPointerDown', setInput as any);
      window.addEventListener('MSPointerMove', setIntent as any);
    } else {
      // mouse events
      window.addEventListener('mousedown', setInput);
      window.addEventListener('mousemove', setIntent);

      // touch events
      if ('ontouchstart' in window) {
        window.addEventListener('touchstart', setInput, options);
        window.addEventListener('touchend', setInput);
      }
    }

    // mouse wheel
    window.addEventListener(detectWheel(), setIntent as any, options);

    // keyboard events
    window.addEventListener('keydown', setInput);
    window.addEventListener('keyup', setInput);

    // focus events
    window.addEventListener('focusin', setElement);
    window.addEventListener('focusout', clearElement);
  }

  // checks if input persistence should happen and
  // get saved state from session storage if true (defaults to `false`)
  const setPersist = () => {
    shouldPersist = !(
      docElem.getAttribute('data-whatpersist') ||
      document.body.getAttribute('data-whatpersist') === 'false'
    );

    if (shouldPersist) {
      // check for session variables and use if available
      try {
        if (window.sessionStorage.getItem(WHAT_INPUT)) {
          currentInput = window.sessionStorage.getItem(WHAT_INPUT) as Inputs;
        }

        if (window.sessionStorage.getItem(WHAT_INTENT)) {
          currentIntent = window.sessionStorage.getItem(WHAT_INTENT) as Inputs;
        }
      } catch (e) {
        // fail silently
      }
    }

    // always run these so at least `initial` state is set
    doUpdate(INPUT);
    doUpdate(INTENT);
  };

  // checks conditions before updating new input
  const setInput = (event: PossibleEvent) => {
    const eventKey = event.which;
    let value = inputMap[event.type];

    if (value === POINTER) {
      value = pointerType(event as PointerEvent);
    }

    const ignoreMatch =
      !specificMap.length && ignoreMap.indexOf(eventKey) === -1;

    const specificMatch =
      specificMap.length && specificMap.indexOf(eventKey) !== -1;

    let shouldUpdate =
      (value === 'keyboard' && eventKey && (ignoreMatch || specificMatch)) ||
      value === 'mouse' ||
      value === 'touch';

    // prevent touch detection from being overridden by event execution order
    if (validateTouch(value)) {
      shouldUpdate = false;
    }

    if (shouldUpdate && currentInput !== value) {
      currentInput = value;

      persistInput(INPUT, currentInput);
      doUpdate(INPUT);
    }

    if (shouldUpdate && currentIntent !== value) {
      // preserve intent for keyboard interaction with form fields
      const activeElem = document.activeElement;
      const notFormInput =
        activeElem &&
        activeElem.nodeName &&
        (formInputs.indexOf(activeElem.nodeName.toLowerCase()) === -1 ||
          (activeElem.nodeName.toLowerCase() === 'button' &&
            !checkClosest(activeElem, 'form')));

      if (notFormInput) {
        currentIntent = value;

        persistInput(INTENT, currentIntent);
        doUpdate(INTENT);
      }
    }
  };

  // updates the doc and `inputTypes` array with new input
  const doUpdate = (which: string) => {
    docElem.setAttribute(
      'data-what' + which,
      which === INPUT ? currentInput : currentIntent
    );

    fireFunctions(which);
  };

  // updates input intent for `mousemove` and `pointermove`
  const setIntent = (event: PointerEvent | MouseEvent | WheelEvent) => {
    let value = inputMap[event.type];

    if (value === POINTER) {
      value = pointerType(event as PointerEvent);
    }

    // test to see if `mousemove` happened relative to the screen to detect
    // scrolling versus mousemove
    detectScrolling(event);

    // only execute if scrolling isn't happening
    if (
      ((!isScrolling && !validateTouch(value)) ||
        (isScrolling && event.type === 'wheel') ||
        event.type === 'mousewheel' ||
        event.type === 'DOMMouseScroll') &&
      currentIntent !== value
    ) {
      currentIntent = value;

      persistInput(INTENT, currentIntent);
      doUpdate(INTENT);
    }
  };

  const setElement = (event: PossibleEvent) => {
    if (!(event.target as any).nodeName) {
      // If nodeName is undefined, clear the element
      // This can happen if click inside an <svg> element.
      clearElement();
      return;
    }

    let target = event.target as HTMLElement;

    currentElement = target.nodeName.toLowerCase();
    docElem.setAttribute('data-whatelement', currentElement);

    if (target.classList && target.classList.length) {
      docElem.setAttribute(
        'data-whatclasses',
        target.classList.toString().replace(' ', ',')
      );
    }
  };

  const clearElement = () => {
    currentElement = null;

    docElem.removeAttribute('data-whatelement');
    docElem.removeAttribute('data-whatclasses');
  };

  const persistInput = (which: string, value: Inputs) => {
    if (shouldPersist) {
      try {
        window.sessionStorage.setItem('what-' + which, value);
      } catch (e) {
        // fail silently
      }
    }
  };

  /*
   * utilities
   */

  const pointerType = (event: PointerEvent): Inputs => {
    if (typeof event.pointerType === 'number') {
      return pointerMap[event.pointerType];
    }
    // treat pen like touch
    return event.pointerType === 'pen'
      ? Inputs.Touch
      : (event.pointerType as Inputs);
  };

  // prevent touch detection from being overridden by event execution order
  const validateTouch = (value: Inputs) => {
    const timestamp = Date.now();

    const touchIsValid =
      value === 'mouse' &&
      currentInput === 'touch' &&
      timestamp - currentTimestamp < 200;

    currentTimestamp = timestamp;

    return touchIsValid;
  };

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
  const detectWheel = (): 'mousewheel' | 'wheel' | 'DOMMouseScroll' => {
    let wheelType = null;

    // Modern browsers support "wheel"
    if ('onwheel' in document.createElement('div')) {
      return 'wheel';
    }
    // Webkit and IE support at least "mousewheel"
    // or assume that remaining browsers are older Firefox
    return (document as any).onmousewheel !== undefined
      ? 'mousewheel'
      : 'DOMMouseScroll';
  };

  // runs callback functions
  const fireFunctions = (type: string) => {
    for (let i = 0, len = functionList.length; i < len; i++) {
      if (functionList[i].type === type) {
        functionList[i].fn.call(
          // @ts-ignore
          this,
          type === INPUT ? currentInput : currentIntent
        );
      }
    }
  };

  // finds matching element in an object
  function objPos(match: any) {
    for (let i = 0, len = functionList.length; i < len; i++) {
      if (functionList[i].fn === match) {
        return i;
      }
    }
    return;
  }

  function detectScrolling(event: PointerEvent | MouseEvent | WheelEvent) {
    if (mousePos.x !== event.screenX || mousePos.y !== event.screenY) {
      isScrolling = false;

      mousePos.x = event.screenX;
      mousePos.y = event.screenY;
    } else {
      isScrolling = true;
    }
  }

  // manual version of `closest()`
  function checkClosest(elem: HTMLElement | Element, tag: string) {
    const ElementPrototype = window.Element.prototype;

    if (!ElementPrototype.matches) {
      ElementPrototype.matches =
        (ElementPrototype as any).msMatchesSelector ||
        ElementPrototype.webkitMatchesSelector;
    }

    if (!ElementPrototype.closest) {
      do {
        if (elem.matches(tag)) {
          return elem;
        }

        elem = elem.parentElement || (elem.parentNode as HTMLElement);
      } while (elem !== null && elem.nodeType === 1);

      return null;
    }
    return elem.closest(tag);
  }

  /*
   * init
   */

  // don't start script unless browser cuts the mustard
  // (also passes if polyfills are used)
  if ('addEventListener' in window && Array.prototype.indexOf) {
    setUp();
  }

  /*
   * api
   */

  return {
    // returns string: the current input type
    // opt: 'intent'|'input'
    // 'input' (default): returns the same value as the `data-whatinput`
    // attribute
    // 'intent': includes `data-whatintent` value if it's different than
    // `data-whatinput`
    ask(opt: EventType) {
      return opt === INTENT ? currentIntent : currentInput;
    },

    // returns string: the currently focused element or null
    element() {
      return currentElement;
    },

    // overwrites ignored keys with provided array
    ignoreKeys(arr: any[]) {
      ignoreMap = arr;
    },

    // overwrites specific char keys to update on
    specificKeys(arr: any[]) {
      specificMap = arr;
    },

    // attach functions to input and intent "events"
    // funct: function to fire on change
    // eventType: 'input'|'intent'
    registerOnChange(fn: Function, eventType: EventType) {
      functionList.push({
        fn,
        type: eventType || INPUT,
      });
    },

    unRegisterOnChange(fn: Function) {
      const position = objPos(fn);

      if (position || position === 0) {
        functionList.splice(position, 1);
      }
    },

    clearStorage() {
      window.sessionStorage.clear();
    },
  };
}
