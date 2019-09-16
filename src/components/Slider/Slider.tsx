import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { useId, useDimensions } from '$lib/hooks';
import { wrapEvent, mergeRefs } from '$lib/utils';
import { Element } from '$lib/types';

const noop = () => void null;

// A11y reference:
//   - http://www.oaa-accessibility.org/examplep/slider1/
//   - https://github.com/Stanko/aria-progress-range-slider

// TODO: Figure out capturing pointerUp outside of the window when handle is focused
// TODO: Warnings when switching from controlled/uncontrolled, etc.
// TODO: Implement + test valueText

enum SliderOrientations {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

enum HandleAlignments {
  // Handle is centered directly over the current value marker
  Center = 'center',
  // Handle is contained within the bounds of the track, offset slightlu from the value's
  // center mark to accommodate
  Contain = 'contain',
}

type DivAttributes = React.DOMAttributes<HTMLDivElement>;
type DivRef = React.MutableRefObject<HTMLElement | undefined>;

interface SliderContextProps {
  ariaLabelledBy?: string;
  handleDimensions: { width: number; height: number };
  handlePosition: string;
  handleRef?: DivRef;
  onKeyDown: DivAttributes['onKeyDown'];
  onPointerDown: DivAttributes['onPointerDown'];
  onPointerMove: DivAttributes['onPointerMove'];
  onPointerUp: DivAttributes['onPointerUp'];
  onHandleBlur: DivAttributes['onBlur'];
  onHandleFocus: DivAttributes['onFocus'];
  onHandleKeyDown: DivAttributes['onKeyDown'];
  sliderId: string;
  sliderMax: number;
  sliderMin: number;
  sliderValue: number;
  valueText?: string;
  disabled?: boolean;
  isVertical: boolean;
  orientation: SliderOrientations;
  sliderStep?: number;
  trackPercent: number;
  trackRef?: React.MutableRefObject<HTMLElement | undefined>;
  trackHighlightStyle: any;
  updateValue(newValue: any): void;
}

export const SliderContext = createContext<SliderContextProps>({
  ariaLabelledBy: '',
  handleDimensions: { width: 0, height: 0 },
  handlePosition: '',
  handleRef: undefined,
  onKeyDown: noop,
  onPointerDown: noop,
  onPointerMove: noop,
  onPointerUp: noop,
  onHandleBlur: noop,
  onHandleFocus: noop,
  onHandleKeyDown: noop,
  sliderId: '',
  sliderMax: 100,
  sliderMin: 0,
  sliderValue: 0,
  valueText: undefined,
  disabled: undefined,
  isVertical: false,
  orientation: SliderOrientations.Horizontal,
  sliderStep: 1,
  trackPercent: 0,
  trackRef: undefined,
  trackHighlightStyle: {},
  updateValue: noop,
});
export const useSliderContext = () => useContext(SliderContext);

interface SliderProps
  extends Omit<Element<'div'>, 'defaultValue' | 'onChange'> {
  defaultValue?: number;
  disabled?: boolean;
  value?: number;
  getValueText?(value: number): string;
  handleAlignment?: HandleAlignments;
  max?: number;
  min?: number;
  name?: string;
  onChange?(
    newValue: number,
    context?: { min?: number; max?: number; handlePosition?: string }
  ): void;
  orientation?: SliderOrientations;
  step?: number;
}

////////////////////////////////////////////////////////////////////////////////
export const Slider: React.FC<SliderProps> = forwardRef(function Slider(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-valuetext': ariaValueText,
    defaultValue,
    disabled,
    value: controlledValue,
    getValueText,
    handleAlignment = HandleAlignments.Center,
    id,
    max = 100,
    min = 0,
    name,
    onBlur,
    onFocus,
    onChange,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    orientation = SliderOrientations.Horizontal,
    step = 1,
    children,
    ...rest
  },
  ref
) {
  const { current: isControlled } = useRef(controlledValue != null);
  const trackRef = useRef<HTMLElement>();
  const handleRef = useRef<HTMLElement>();
  const _id = useId();
  const [value, setValue] = useState(defaultValue || min);
  const _value = isControlled ? controlledValue : value;
  const actualValue = getAllowedValue(_value!, min, max);
  const trackPercent = valueToPercent(actualValue, min, max);
  const [handleDimensions] = useDimensions(handleRef);
  const isVertical = orientation === SliderOrientations.Vertical;

  const handleSize = isVertical
    ? handleDimensions.height
    : handleDimensions.width;

  const handlePosition = `calc(${trackPercent}% - ${
    handleAlignment === HandleAlignments.Center
      ? `${handleSize}px / 2`
      : `${handleSize}px * ${trackPercent * 0.01}`
  })`;

  const updateValue = useCallback(
    newValue => {
      if (!isControlled) {
        setValue(newValue);
      }
      if (onChange) {
        onChange(newValue, { min, max, handlePosition });
      }
    },
    [handlePosition, isControlled, max, min, onChange]
  );

  const {
    handleKeyDown,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
  } = useSliderEvents({
    disabled,
    handleRef,
    isVertical,
    min,
    max,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    step,
    value: actualValue,
    trackRef,
    updateValue,
  });
  const valueText = getValueText ? getValueText(actualValue) : ariaValueText;

  const sliderId = id || _id;

  const trackHighlightStyle = isVertical
    ? {
        width: `100%`,
        height: `${trackPercent}%`,
        bottom: 0,
      }
    : {
        width: `${trackPercent}%`,
        height: `100%`,
        left: 0,
      };

  const ctx: SliderContextProps = {
    ariaLabelledBy,
    handleDimensions,
    handlePosition,
    handleRef,
    onKeyDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onHandleBlur: onBlur,
    onHandleFocus: onFocus,
    onHandleKeyDown: handleKeyDown,
    sliderId,
    sliderMax: max,
    sliderMin: min,
    sliderValue: actualValue,
    valueText: valueText || '',
    disabled: disabled || false,
    isVertical,
    orientation,
    sliderStep: step,
    trackPercent,
    trackRef,
    trackHighlightStyle,
    updateValue,
  };

  return (
    <SliderContext.Provider value={ctx}>
      <div
        role="presentation"
        ref={ref as any}
        tabIndex={-1}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        aria-disabled={disabled}
        id={sliderId}
        {...rest}
      >
        {children}
        {name && (
          // If the slider is used in a form we'll need an input field to capture the value.
          // We'll assume this when the component is given a form field name.
          <input
            type="hidden"
            value={actualValue}
            name={name}
            id={`input:${sliderId}`}
          />
        )}
      </div>
    </SliderContext.Provider>
  );
});

////////////////////////////////////////////////////////////////////////////////
interface TrackProps extends Element<'div'> {}

export const Track: React.FC<TrackProps> = forwardRef(function Track(
  { children, style = {}, ...props },
  forwardedRef
) {
  const { trackRef } = useSliderContext();
  const ownRef = useRef(null);
  const ref = forwardedRef || ownRef;

  return (
    <div
      ref={refNode => mergeRefs([ref, trackRef], refNode)}
      id="track"
      style={{ ...style, position: 'relative' }}
      {...props}
    >
      {children}
    </div>
  );
});

////////////////////////////////////////////////////////////////////////////////
interface TrackHighlightProps extends Element<'div'> {}

export const TrackHighlight: React.FC<TrackHighlightProps> = forwardRef(
  function TrackHighlight({ children, style = {}, ...props }, forwardedRef) {
    const { trackHighlightStyle } = useSliderContext();
    const ownRef = useRef(null);
    const ref = forwardedRef || ownRef;

    return (
      <div
        ref={ref as any}
        style={{ position: 'absolute', ...trackHighlightStyle, ...style }}
        {...props}
      />
    );
  }
);

////////////////////////////////////////////////////////////////////////////////
interface HandleProps extends Element<'div'> {}

export const Handle: React.FC<HandleProps> = forwardRef(function Handle(
  {
    // min, // TODO: Create separate min/max for handles
    // max,
    style = {},
    ...props
  },
  forwardedRef
) {
  const {
    ariaLabelledBy,
    disabled,
    handlePosition,
    handleRef,
    isVertical,
    onHandleBlur: onBlur,
    onHandleFocus: onFocus,
    onHandleKeyDown: onKeyDown,
    orientation,
    sliderMin,
    sliderMax,
    sliderValue,
    valueText,
  } = useSliderContext();

  const ownRef = useRef(null);
  const ref = forwardedRef || ownRef;

  return (
    <div
      onBlur={onBlur}
      onFocus={onFocus}
      ref={refNode => mergeRefs([ref, handleRef], refNode)}
      role="slider"
      tabIndex={disabled ? undefined : 0}
      aria-disabled={disabled}
      aria-valuemin={sliderMin}
      aria-valuetext={valueText}
      aria-orientation={orientation}
      aria-valuenow={sliderValue}
      aria-valuemax={sliderMax}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={onKeyDown}
      style={{
        position: 'absolute',
        ...(isVertical ? { bottom: handlePosition } : { left: handlePosition }),
        ...style,
      }}
      {...props}
    />
  );
});

////////////////////////////////////////////////////////////////////////////////
interface MarkerProps extends Element<'div'> {
  value: number;
}

export const Marker: React.FC<MarkerProps> = forwardRef(function Marker(
  { children, style = {}, value, ...props },
  forwardedRef
) {
  const { isVertical, sliderMin, sliderMax, sliderValue } = useSliderContext();

  const ownRef = useRef(null);
  const ref = forwardedRef || ownRef;
  const actualValue = valueToPercent(value, sliderMin, sliderMax);

  const absoluteStartPosition = `${actualValue}%`;

  return value != null ? (
    <div
      role="presentation"
      ref={ref as any}
      style={{
        position: 'absolute',
        ...(isVertical
          ? { bottom: absoluteStartPosition }
          : { left: absoluteStartPosition }),
        ...style,
      }}
      {...props}
      children={children}
    />
  ) : null;
});

////////////////////////////////////////////////////////////////////////////////
export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

export function makeValuePrecise(value: number, step: number) {
  const stepDecimalPart = step.toString().split('.')[1];
  const stepPrecision = stepDecimalPart ? stepDecimalPart.length : 0;
  return Number(value.toFixed(stepPrecision));
}

export function roundValueToStep(value: number, step: number) {
  return makeValuePrecise(Math.round(value / step) * step, step);
}

export function getAllowedValue(value: number, min: number, max: number) {
  return value > max ? max : value < min ? min : value;
}

export const makeId = (id: string, index: string | number) => `${id}:${index}`;

type UseSliderEventsArgs = Partial<SliderContextProps & SliderProps>;

const useSliderEvents = ({
  disabled,
  handleRef,
  isVertical,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  min,
  max,
  step,
  value,
  trackRef,
  updateValue,
}: UseSliderEventsArgs) => {
  const [active, setActive] = useState(false);
  const getNewValue = (event: React.PointerEvent<HTMLDivElement>) => {
    if (trackRef && trackRef.current) {
      const {
        left,
        width,
        bottom,
        height,
      } = trackRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      const diff = isVertical ? bottom - clientY : clientX - left;
      const percent = diff / (isVertical ? height : width);
      let newValue = percentToValue(percent, min!, max!);

      if (step) {
        newValue = roundValueToStep(newValue, step);
      }
      newValue = getAllowedValue(newValue, min!, max!);
      return newValue;
    }
    return;
  };

  const handleKeyDown = wrapEvent(onKeyDown, event => {
    let flag = false;
    let newValue: number;
    const tenSteps = (max! - min!) / 10;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = value! - step!;
        flag = true;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = value! + step!;
        flag = true;
        break;
      case 'PageDown':
        newValue = value! - tenSteps;
        flag = true;
        break;
      case 'PageUp':
        newValue = value! + tenSteps;
        flag = true;
        break;
      case 'Home':
        newValue = min!;
        flag = true;
        break;
      case 'End':
        newValue = max!;
        flag = true;
        break;
      default:
        newValue = 0;
        return;
    }

    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (step) {
      newValue = roundValueToStep(newValue!, step);
    }
    newValue = getAllowedValue(newValue, min!, max!);
    updateValue && updateValue(newValue);
  });

  const handlePointerMove = wrapEvent(onPointerMove, event => {
    if (disabled) {
      if (active) setActive(false);
      return;
    }
    event.preventDefault();
    if (active) {
      const newValue = getNewValue(event);
      if (newValue !== value && updateValue) {
        updateValue(newValue);
      }
    }
  });

  const handlePointerDown = wrapEvent(onPointerDown, event => {
    if (disabled) {
      if (active) setActive(false);
      return;
    }

    if (handleRef && handleRef.current) {
      handleRef.current.focus();
      const newValue = getNewValue(event);
      handleRef.current.setPointerCapture(event.pointerId);
      setActive(true);
      if (newValue !== value && updateValue) {
        updateValue(newValue);
      }
    }

    // We need to make sure the handle is moveable immediately on first click, so we need
    // to prevent the slider from getting focus by calling `preventDefault.
    // The problem is, this also screws up the pointer events resulting in some jank if the
    // user moves the pointer outside the element before releasing.
    // This needs some work.
    event.preventDefault();
  });

  const handlePointerUp = wrapEvent(onPointerUp, event => {
    if (handleRef && handleRef.current && event.pointerId) {
      handleRef.current.releasePointerCapture(event.pointerId);
    }
    setActive(false);
  });

  return {
    handleKeyDown,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
  };
};
