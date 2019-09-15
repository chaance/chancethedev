import { EventHandler } from 'react';

export const wrapEvent = <E extends React.SyntheticEvent>(
  theirHandler: EventHandler<E> | undefined,
  ourHandler: EventHandler<E>
) => (event: E) => {
  theirHandler && theirHandler(event);
  if (!event.defaultPrevented) {
    return ourHandler(event);
  }
};

export const callEventWithDefault = <E extends React.SyntheticEvent>(
  theirHandler: EventHandler<E> | undefined,
  ourHandler: EventHandler<E>
) => (event: E) => {
  theirHandler && theirHandler(event);
  if (!event.defaultPrevented) {
    ourHandler && ourHandler(event);
  }
};
