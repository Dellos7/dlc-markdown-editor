import { k as pointerCoord } from './chunk-f3597f81.js';

const cloneMap = new WeakMap();
function relocateInput(componentEl, inputEl, shouldRelocate, inputRelativeY = 0) {
    if (cloneMap.has(componentEl) === shouldRelocate) {
        return;
    }
    if (shouldRelocate) {
        addClone(componentEl, inputEl, inputRelativeY);
    }
    else {
        removeClone(componentEl, inputEl);
    }
}
function isFocused(input) {
    return input === input.getRootNode().activeElement;
}
function addClone(componentEl, inputEl, inputRelativeY) {
    // this allows for the actual input to receive the focus from
    // the user's touch event, but before it receives focus, it
    // moves the actual input to a location that will not screw
    // up the app's layout, and does not allow the native browser
    // to attempt to scroll the input into place (messing up headers/footers)
    // the cloned input fills the area of where native input should be
    // while the native input fakes out the browser by relocating itself
    // before it receives the actual focus event
    // We hide the focused input (with the visible caret) invisible by making it scale(0),
    const parentEl = inputEl.parentNode;
    // DOM WRITES
    const clonedEl = inputEl.cloneNode(false);
    clonedEl.classList.add('cloned-input');
    clonedEl.tabIndex = -1;
    parentEl.appendChild(clonedEl);
    cloneMap.set(componentEl, clonedEl);
    const doc = componentEl.ownerDocument;
    const tx = doc.dir === 'rtl' ? 9999 : -9999;
    componentEl.style.pointerEvents = 'none';
    inputEl.style.transform = `translate3d(${tx}px,${inputRelativeY}px,0) scale(0)`;
}
function removeClone(componentEl, inputEl) {
    const clone = cloneMap.get(componentEl);
    if (clone) {
        cloneMap.delete(componentEl);
        clone.remove();
    }
    componentEl.style.pointerEvents = '';
    inputEl.style.transform = '';
}

function enableHideCaretOnScroll(componentEl, inputEl, scrollEl) {
    if (!scrollEl || !inputEl) {
        return () => { return; };
    }
    const scrollHideCaret = (shouldHideCaret) => {
        if (isFocused(inputEl)) {
            relocateInput(componentEl, inputEl, shouldHideCaret);
        }
    };
    const onBlur = () => relocateInput(componentEl, inputEl, false);
    const hideCaret = () => scrollHideCaret(true);
    const showCaret = () => scrollHideCaret(false);
    scrollEl.addEventListener('ionScrollStart', hideCaret);
    scrollEl.addEventListener('ionScrollEnd', showCaret);
    inputEl.addEventListener('blur', onBlur);
    return () => {
        scrollEl.removeEventListener('ionScrollStart', hideCaret);
        scrollEl.removeEventListener('ionScrollEnd', showCaret);
        inputEl.addEventListener('ionBlur', onBlur);
    };
}

const SKIP_SELECTOR = 'input, textarea, [no-blur]';
function enableInputBlurring(doc) {
    let focused = true;
    let didScroll = false;
    function onScroll() {
        didScroll = true;
    }
    function onFocusin() {
        focused = true;
    }
    function onTouchend(ev) {
        // if app did scroll return early
        if (didScroll) {
            didScroll = false;
            return;
        }
        const active = doc.activeElement;
        if (!active) {
            return;
        }
        // only blur if the active element is a text-input or a textarea
        if (active.matches(SKIP_SELECTOR)) {
            return;
        }
        // if the selected target is the active element, do not blur
        const tapped = ev.target;
        if (tapped === active) {
            return;
        }
        if (tapped.matches(SKIP_SELECTOR) || tapped.closest(SKIP_SELECTOR)) {
            return;
        }
        focused = false;
        // TODO: find a better way, why 50ms?
        setTimeout(() => {
            if (!focused) {
                active.blur();
            }
        }, 50);
    }
    doc.addEventListener('ionScrollStart', onScroll);
    doc.addEventListener('focusin', onFocusin, true);
    doc.addEventListener('touchend', onTouchend, false);
    return () => {
        doc.removeEventListener('ionScrollStart', onScroll, true);
        doc.removeEventListener('focusin', onFocusin, true);
        doc.removeEventListener('touchend', onTouchend, false);
    };
}

const SCROLL_ASSIST_SPEED = 0.3;
function getScrollData(componentEl, contentEl, keyboardHeight) {
    const itemEl = componentEl.closest('ion-item,[ion-item]') || componentEl;
    return calcScrollData(itemEl.getBoundingClientRect(), contentEl.getBoundingClientRect(), keyboardHeight, componentEl.ownerDocument.defaultView.innerHeight);
}
function calcScrollData(inputRect, contentRect, keyboardHeight, platformHeight) {
    // compute input's Y values relative to the body
    const inputTop = inputRect.top;
    const inputBottom = inputRect.bottom;
    // compute visible area
    const visibleAreaTop = contentRect.top;
    const visibleAreaBottom = Math.min(contentRect.bottom, platformHeight - keyboardHeight);
    // compute safe area
    const safeAreaTop = visibleAreaTop + 15;
    const safeAreaBottom = visibleAreaBottom * 0.5;
    // figure out if each edge of the input is within the safe area
    const distanceToBottom = safeAreaBottom - inputBottom;
    const distanceToTop = safeAreaTop - inputTop;
    // desiredScrollAmount is the negated distance to the safe area according to our calculations.
    const desiredScrollAmount = Math.round((distanceToBottom < 0)
        ? -distanceToBottom
        : (distanceToTop > 0)
            ? -distanceToTop
            : 0);
    // our calculations make some assumptions that aren't always true, like the keyboard being closed when an input
    // gets focus, so make sure we don't scroll the input above the visible area
    const scrollAmount = Math.min(desiredScrollAmount, inputTop - visibleAreaTop);
    const distance = Math.abs(scrollAmount);
    const duration = distance / SCROLL_ASSIST_SPEED;
    const scrollDuration = Math.min(400, Math.max(150, duration));
    return {
        scrollAmount,
        scrollDuration,
        scrollPadding: keyboardHeight,
        inputSafeY: -(inputTop - safeAreaTop) + 4
    };
}

function enableScrollAssist(componentEl, inputEl, contentEl, keyboardHeight) {
    let coord;
    const touchStart = (ev) => {
        coord = pointerCoord(ev);
    };
    const touchEnd = (ev) => {
        // input cover touchend/mouseup
        if (!coord) {
            return;
        }
        // get where the touchend/mouseup ended
        const endCoord = pointerCoord(ev);
        // focus this input if the pointer hasn't moved XX pixels
        // and the input doesn't already have focus
        if (!hasPointerMoved(6, coord, endCoord) && !isFocused(inputEl)) {
            ev.preventDefault();
            ev.stopPropagation();
            // begin the input focus process
            jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight);
        }
    };
    componentEl.addEventListener('touchstart', touchStart, true);
    componentEl.addEventListener('touchend', touchEnd, true);
    return () => {
        componentEl.removeEventListener('touchstart', touchStart, true);
        componentEl.removeEventListener('touchend', touchEnd, true);
    };
}
function jsSetFocus(componentEl, inputEl, contentEl, keyboardHeight) {
    const scrollData = getScrollData(componentEl, contentEl, keyboardHeight);
    if (Math.abs(scrollData.scrollAmount) < 4) {
        // the text input is in a safe position that doesn't
        // require it to be scrolled into view, just set focus now
        inputEl.focus();
        return;
    }
    // temporarily move the focus to the focus holder so the browser
    // doesn't freak out while it's trying to get the input in place
    // at this point the native text input still does not have focus
    relocateInput(componentEl, inputEl, true, scrollData.inputSafeY);
    inputEl.focus();
    // scroll the input into place
    contentEl.scrollByPoint(0, scrollData.scrollAmount, scrollData.scrollDuration).then(() => {
        // the scroll view is in the correct position now
        // give the native text input focus
        relocateInput(componentEl, inputEl, false, scrollData.inputSafeY);
        // ensure this is the focused input
        inputEl.focus();
    });
}
function hasPointerMoved(threshold, startCoord, endCoord) {
    if (startCoord && endCoord) {
        const deltaX = (startCoord.x - endCoord.x);
        const deltaY = (startCoord.y - endCoord.y);
        const distance = deltaX * deltaX + deltaY * deltaY;
        return distance > (threshold * threshold);
    }
    return false;
}

const PADDING_TIMER_KEY = '$ionPaddingTimer';
function enableScrollPadding(doc, keyboardHeight) {
    function onFocusin(ev) {
        setScrollPadding(ev.target, keyboardHeight);
    }
    function onFocusout(ev) {
        setScrollPadding(ev.target, 0);
    }
    doc.addEventListener('focusin', onFocusin);
    doc.addEventListener('focusout', onFocusout);
    return () => {
        doc.removeEventListener('focusin', onFocusin);
        doc.removeEventListener('focusout', onFocusout);
    };
}
function setScrollPadding(input, keyboardHeight) {
    if (input.tagName !== 'INPUT') {
        return;
    }
    if (input.parentElement && input.parentElement.tagName === 'ION-INPUT') {
        return;
    }
    if (input.parentElement &&
        input.parentElement.parentElement &&
        input.parentElement.parentElement.tagName === 'ION-SEARCHBAR') {
        return;
    }
    const el = input.closest('ion-content');
    if (el === null) {
        return;
    }
    const timer = el[PADDING_TIMER_KEY];
    if (timer) {
        clearTimeout(timer);
    }
    if (keyboardHeight > 0) {
        el.style.setProperty('--keyboard-offset', `${keyboardHeight}px`);
    }
    else {
        el[PADDING_TIMER_KEY] = setTimeout(() => {
            el.style.setProperty('--keyboard-offset', '0px');
        }, 120);
    }
}

const INPUT_BLURRING = true;
const SCROLL_ASSIST = true;
const SCROLL_PADDING = true;
const HIDE_CARET = true;
function startInputShims(doc, config) {
    const keyboardHeight = config.getNumber('keyboardHeight', 290);
    const scrollAssist = config.getBoolean('scrollAssist', true);
    const hideCaret = config.getBoolean('hideCaretOnScroll', true);
    const inputBlurring = config.getBoolean('inputBlurring', true);
    const scrollPadding = config.getBoolean('scrollPadding', true);
    const hideCaretMap = new WeakMap();
    const scrollAssistMap = new WeakMap();
    function registerInput(componentEl) {
        const inputEl = (componentEl.shadowRoot || componentEl).querySelector('input') || (componentEl.shadowRoot || componentEl).querySelector('textarea');
        const scrollEl = componentEl.closest('ion-content');
        if (!inputEl) {
            return;
        }
        if (HIDE_CARET && !!scrollEl && hideCaret && !hideCaretMap.has(componentEl)) {
            const rmFn = enableHideCaretOnScroll(componentEl, inputEl, scrollEl);
            hideCaretMap.set(componentEl, rmFn);
        }
        if (SCROLL_ASSIST && !!scrollEl && scrollAssist && !scrollAssistMap.has(componentEl)) {
            const rmFn = enableScrollAssist(componentEl, inputEl, scrollEl, keyboardHeight);
            scrollAssistMap.set(componentEl, rmFn);
        }
    }
    function unregisterInput(componentEl) {
        if (HIDE_CARET && hideCaret) {
            const fn = hideCaretMap.get(componentEl);
            if (fn) {
                fn();
            }
            hideCaretMap.delete(componentEl);
        }
        if (SCROLL_ASSIST && scrollAssist) {
            const fn = scrollAssistMap.get(componentEl);
            if (fn) {
                fn();
            }
            scrollAssistMap.delete(componentEl);
        }
    }
    if (inputBlurring && INPUT_BLURRING) {
        enableInputBlurring(doc);
    }
    if (scrollPadding && SCROLL_PADDING) {
        enableScrollPadding(doc, keyboardHeight);
    }
    // Input might be already loaded in the DOM before ion-device-hacks did.
    // At this point we need to look for all of the inputs not registered yet
    // and register them.
    const inputs = Array.from(doc.querySelectorAll('ion-input, ion-textarea'));
    for (const input of inputs) {
        registerInput(input);
    }
    doc.body.addEventListener('ionInputDidLoad', event => {
        registerInput(event.target);
    });
    doc.body.addEventListener('ionInputDidUnload', event => {
        unregisterInput(event.target);
    });
}

export { startInputShims };
