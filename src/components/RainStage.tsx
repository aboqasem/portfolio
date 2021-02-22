/* eslint-disable no-param-reassign */
import React, { Component, createRef, RefObject } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { myTechnologies } from '../common/data';

interface IState {
  ticker?: number;
}
export class RainStage extends Component<Record<string, unknown>, IState> {
  private stageRef: RefObject<HTMLDivElement>;

  constructor(props: Record<string, unknown>) {
    super(props);
    this.stageRef = createRef<HTMLDivElement>();
  }

  componentDidMount = (): void => {
    const { stageRef } = this;
    const { current: stage } = stageRef;
    const { random: rand } = Math;

    if (stage) {
      const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

      // initialize randomly placed drops on screens
      const drops = myTechnologies.map((t) => {
        // covert react element to html string
        const svg = renderToStaticMarkup(t({}));
        // create a new drop
        const drop = document.createElement('div');
        drop.innerHTML = svg;
        drop.classList.add('fixed', 'text-2xl', 'sm:text-3xl', 'md:text-4xl');
        drop.style.marginTop = `${rand() * stageHeight}px`;
        drop.style.marginLeft = `${rand() * stageWidth}px`;
        // add drop to stage
        stage.appendChild(drop);
        return drop;
      });

      // start ticking
      this.setState({
        ticker: setInterval(this.tick, 10, stage, drops),
      });
    }
  };

  componentWillUnmount = (): void => {
    const { ticker } = this.state;
    if (ticker) {
      clearInterval(ticker);
    }
  };

  tick = (stage: HTMLDivElement, drops: HTMLDivElement[]): void => {
    const { offsetWidth: stageWidth, offsetHeight: stageHeight } = stage;

    drops.forEach((drop) => {
      const [marginTop, marginLeft] = [
        +drop.style.marginTop.replace('px', ''),
        +drop.style.marginLeft.replace('px', ''),
      ];
      const dropHeight = +drop.offsetHeight;

      // move the drop down
      drop.style.marginTop = `${marginTop + 0.7}px`;
      // if it is out of stage, get it back to top
      if (marginTop >= stageHeight) {
        drop.style.marginTop = `-${dropHeight}px`;
      }
      // if the stage gets smaller then make sure every drop is inside
      if (marginLeft >= stageWidth) {
        drop.style.marginTop = `-${dropHeight}px`;
        drop.style.marginLeft = `${Math.random() * stageWidth}px`;
      }
    });
  };

  render = (): JSX.Element => {
    return <div ref={this.stageRef} className="fixed top-0 left-0 w-screen h-screen" style={{ zIndex: -1000 }}></div>;
  };
}

export default RainStage;
