/* eslint-disable no-param-reassign */
import React, { Component, createRef, RefObject } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconType } from 'react-icons';

interface IProps {
  icons: IconType[];
}

interface IState {
  ticker?: number;
}

export class RainStage extends Component<IProps, IState> {
  private stageRef: RefObject<HTMLDivElement>;

  constructor(props: IProps) {
    super(props);
    this.stageRef = createRef<HTMLDivElement>();
  }

  componentDidMount = (): void => {
    const { icons } = this.props;
    const { stageRef } = this;
    const { current: stage } = stageRef;
    const { random: rand } = Math;

    if (stage) {
      const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

      // initialize randomly placed drops on screens
      const drops = icons.map((i) => {
        // covert react element to html string
        const svg = renderToStaticMarkup(i({}));
        // create a new drop
        const drop = document.createElement('div');
        drop.innerHTML = svg;
        drop.classList.add('fixed', 'text-2xl', 'sm:text-3xl', 'md:text-4xl');
        // add drop to stage
        stage.appendChild(drop);
        // retrieve width after appending
        const { offsetWidth: dropWidth } = drop;
        drop.style.marginTop = `${rand() * stageHeight}px`;
        // make sure drop is inside stage
        drop.style.marginLeft = `${rand() * (stageWidth - dropWidth)}px`;

        return drop;
      });

      // rearrange overlapping drops
      drops.forEach((drop) => {
        while (RainStage.anyOverlapping(drops, drop)) {
          drop.style.marginTop = `${rand() * stageHeight}px`;
          drop.style.marginLeft = `${rand() * stageWidth}px`;
        }
      });

      // start ticking
      this.setState({
        ticker: setInterval(RainStage.tick, 25, stage, drops),
      });
    }
  };

  componentWillUnmount = (): void => {
    const { ticker } = this.state;
    if (ticker) {
      clearInterval(ticker);
    }
  };

  private static areOverlapping = (d1: HTMLDivElement, d2: HTMLDivElement): boolean => {
    // if the same drop, skip
    if (d1 === d2) return false;

    const tl1 = { x: +d1.style.marginLeft.replace('px', ''), y: +d1.style.marginTop.replace('px', '') };
    const br1 = { x: d1.offsetWidth + tl1.x, y: d1.offsetHeight + tl1.y };
    const tl2 = { x: +d2.style.marginLeft.replace('px', ''), y: +d2.style.marginTop.replace('px', '') };
    const br2 = { x: d2.offsetWidth + tl2.x, y: d2.offsetHeight + tl2.y };

    // if one rectangle is beside other
    if (tl1.x >= br2.x || tl2.x >= br1.x) return false;
    // if one rectangle is above other
    if (tl1.y >= br2.y || tl2.y >= br1.y) return false;

    return true;
  };

  private static anyOverlapping = (otherDrops: HTMLDivElement[], drop: HTMLDivElement): boolean => {
    return otherDrops.some((otherDrop) => RainStage.areOverlapping(drop, otherDrop));
  };

  private static tick = (stage: HTMLDivElement, drops: HTMLDivElement[]): void => {
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;
    const { random: rand } = Math;

    drops.forEach((drop) => {
      const [marginTop, marginLeft] = [
        +drop.style.marginTop.replace('px', ''),
        +drop.style.marginLeft.replace('px', ''),
      ];
      const dropHeight = +drop.offsetHeight;

      // move the drop down
      drop.style.marginTop = `${marginTop + 1}px`;
      // if it is out of stage, get it back to top
      if (marginTop >= stageHeight) {
        drop.style.marginTop = `-${dropHeight}px`;
      }
      // if the stage gets smaller then make sure every drop is inside
      if (marginLeft >= stageWidth) {
        drop.style.marginLeft = `${rand() * stageWidth}px`;
        while (RainStage.anyOverlapping(drops, drop)) {
          drop.style.marginLeft = `${rand() * stageWidth}px`;
        }
      }
    });
  };

  render = (): JSX.Element => {
    return <div ref={this.stageRef} className="fixed top-0 left-0 w-screen h-screen" style={{ zIndex: -1000 }}></div>;
  };
}

export default RainStage;
