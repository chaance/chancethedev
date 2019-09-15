export function findElPosition(el: HTMLElement) {
  let box;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0,
    };
  }

  const { body, documentElement: docEl } = document;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const scrollLeft = window.pageXOffset || body.scrollLeft;
  const left = box.left + scrollLeft - clientLeft;
  const clientTop = docEl.clientTop || body.clientTop || 0;
  const scrollTop = window.pageYOffset || body.scrollTop;
  const top = box.top + scrollTop - clientTop;

  return {
    left: Math.round(left),
    top: Math.round(top),
  };
}

export function getPointerPosition(
  el: HTMLElement,
  event: React.MouseEvent | React.TouchEvent
) {
  const box = findElPosition(el);
  const boxWidth = el.offsetWidth;
  const boxHeight = el.offsetHeight;
  const boxY = box.top;
  const boxX = box.left;
  let evtPageY = 0;
  let evtPageX = 0;

  if (event instanceof MouseEvent) {
    evtPageY = event.pageY;
    evtPageX = event.pageX;
  }

  if (event instanceof TouchEvent) {
    evtPageX = event.changedTouches[0].pageX;
    evtPageY = event.changedTouches[0].pageY;
  }

  return {
    y: Math.max(0, Math.min(1, (boxY - evtPageY + boxHeight) / boxHeight)),
    x: Math.max(0, Math.min(1, (evtPageX - boxX) / boxWidth)),
  };
}

export function prettyTime(time: number | string) {
  if (typeof time === 'string') {
    time = parseFloat(time);
  }
  const hours = Math.floor(time / 3600);
  let mins = `0${Math.floor((time % 3600) / 60)}`;
  let secs = `0${Math.floor(time % 60)}`;

  mins = mins.substr(mins.length - 2);
  secs = secs.substr(secs.length - 2);

  if (!isNaN(secs as any)) {
    if (hours) {
      return `${hours}:${mins}:${secs}`;
    }
    return `${mins.indexOf('0') === 0 ? mins.substr(1, 1) : mins}:${secs}`;
  }
  return '00:00';
}

export function blurElement(element: any) {
  if (element && typeof element.blur === 'function') {
    element.blur();
  }
}

export function focusElement(element: any) {
  if (element && typeof element.focus === 'function') {
    element.focus();
  }
}
