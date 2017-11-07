// @flow

import * as React from 'react';

declare module 'react-measure' {
  declare type Rect = {
    top: number,
    left: number,
    width: number,
    height: number,
  };

  declare export type ContentRect = {
    entry: ?Rect,
    client: Rect,
    offset: Rect,
    scroll: Rect,
    bounds: {
      top: number,
      right: number,
      bottom: number,
      left: number,
      width: number,
      height: number,
    },
    margin: {
      top: number,
      right: number,
      bottom: number,
      left: number,
    },
  };

  declare type Entry = {
    contentRect: Rect
  };

  declare type Props = {
    client?: boolean,
    offset?: boolean,
    scroll?: boolean,
    bounds?: boolean,
    margin?: boolean,
    innerRef?: React.Ref<*>,
    onResize?: ContentRect => void,
    children: ({
      measureRef: (React$ElementRef<*> | null) => mixed,
      measure: Entry[] => void,
      contentRect: ContentRect
    }) => React.Element<*> | React.ChildrenArray<*>
  };

  declare type Types = 'client' | 'offset' | 'scroll' | 'bounds' | 'margin';

  declare export function withContentRect(types?: Types[]): React.ComponentType<Props>;

  declare var Measure: React.ComponentType<Props>;

  declare export default typeof Measure;
}
