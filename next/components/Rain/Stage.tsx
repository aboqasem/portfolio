/* eslint-disable no-param-reassign */
import React, { Component, createRef, RefObject } from 'react';
import { ConnectedProps } from 'react-redux';

import { rainDropsConnector } from '../../store';
import Drop, { RainDrops } from './Drop';

type ReduxProps = ConnectedProps<typeof rainDropsConnector>;

interface IProps extends ReduxProps {
  htmlStrings: string[];
}

interface IState {
  ticker?: number;
}

export class Stage extends Component<IProps, IState> {
  private stageRef: RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.stageRef = createRef<HTMLDivElement>();
  }

  componentDidMount = (): void => {
    const {
      htmlStrings,
      rainDrops: { areInitialized, rainDrops },
      initializeRainDrops,
    } = this.props;
    const { current: stage } = this.stageRef;

    if (stage) {
      const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

      if (!areInitialized) {
        const newDrops = htmlStrings.map((htmlString) => {
          // initialize randomly placed drops on screens
          // create a new drop
          const drop = new Drop(htmlString);
          // add drop to stage
          stage.appendChild(drop);
          // after appending to get the actual width
          drop.top = Math.random() * stageHeight;
          // make sure drop is inside stage
          drop.left = Math.random() * (stageWidth - drop.width);

          return drop;
        });

        // rearrange overlapping drops
        newDrops.forEach((drop) => {
          while (Stage.anyOverlapping(newDrops, drop)) {
            drop.top = Math.random() * stageHeight;
            drop.left = Math.random() * stageWidth;
          }
        });

        initializeRainDrops(newDrops);

        this.setState({
          ticker: setInterval(Stage.tick, 35, stage, newDrops),
        });
      } else {
        rainDrops.forEach((drop) => stage.appendChild(drop));

        this.setState({
          ticker: setInterval(Stage.tick, 35, stage, rainDrops),
        });
      }
    }
  };

  componentWillUnmount = (): void => {
    const { ticker } = this.state;
    if (ticker) {
      clearInterval(ticker);
    }
  };

  private static anyOverlapping = (drops: RainDrops, drop: Drop): boolean => {
    return drops.some((otherRainDrop) => drop.overlaps(otherRainDrop));
  };

  private static tick = (stage: HTMLDivElement, drops: RainDrops): void => {
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

    drops.forEach((drop) => {
      // move the drop down
      drop.top += 1.5;
      // if it is out of stage, get it back to top
      if (drop.top >= stageHeight) {
        drop.top = -drop.height;
      }
      // if the stage gets smaller then make sure every drop is inside
      if (drop.left >= stageWidth) {
        drop.left = Math.random() * stageWidth;
        while (Stage.anyOverlapping(drops, drop)) {
          drop.left = Math.random() * stageWidth;
        }
      }
    });
  };

  render = (): JSX.Element => {
    return (
      <div ref={this.stageRef} className="fixed top-0 left-0 min-w-full min-h-full" style={{ zIndex: -1000 }}></div>
    );
  };
}

export default rainDropsConnector(Stage);
