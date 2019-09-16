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

  // event instanceof MouseEvent
  if ((event as any).pageY) {
    evtPageY = (event as any).pageY;
    evtPageX = (event as any).pageX;
  }

  // event instanceof TouchEvent
  if ((event as any).changedTouches) {
    evtPageX = (event as any).changedTouches[0].pageX;
    evtPageY = (event as any).changedTouches[0].pageY;
  }

  return {
    y: Math.max(0, Math.min(1, (boxY - evtPageY + boxHeight) / boxHeight)),
    x: Math.max(0, Math.min(1, (evtPageX - boxX) / boxWidth)),
  };
}

export function formatTime(time: number | string = 0, guide = time) {
  if (typeof time === 'string') {
    time = parseFloat(time);
  }
  if (typeof guide === 'string') {
    guide = parseFloat(guide);
  }
  let secs: number | string = Math.floor(time % 60);
  let mins: number | string = Math.floor((time / 60) % 60);
  let hours: number | string = Math.floor(time / 3600);
  const gm = Math.floor((guide / 60) % 60);
  const gh = Math.floor(guide / 3600);

  // handle invalid times
  if (isNaN(time) || time === Infinity) {
    hours = '-';
    mins = '-';
    secs = '-';
  }

  hours = hours > 0 || gh > 0 ? `${hours}:` : '';
  mins = `${(hours || gm >= 10) && mins < 10 ? `0${mins}` : mins}:`;
  secs = secs < 10 ? `0${secs}` : secs;

  return hours + mins + secs;
}
