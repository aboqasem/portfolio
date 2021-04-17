import Position from './Position';

/**
 * A drop is an element that can be placed on the stage.
 * Its top and left are its actual position, but they will not be used to check overlapping.
 * Instead, the actual view's position will be used.
 *
 * Resources:
 * - https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements#how_much_room_does_it_use_up.3f
 * - https://stackoverflow.com/a/4036212/11019230
 * - https://stackoverflow.com/a/44172757/11019230
 */
export default class Drop extends HTMLElement {
  private pos: Position;

  public get width(): number {
    return this.offsetWidth;
  }

  public get height(): number {
    return this.offsetHeight;
  }

  public get top(): number {
    return this.offsetTop;
  }

  public set top(v: number) {
    this.style.top = `${v}px`;
    this.updatePosition();
  }

  public get left(): number {
    return this.offsetLeft;
  }

  public set left(v: number) {
    this.style.left = `${v}px`;
    this.updatePosition();
  }

  constructor(content: string) {
    super();
    this.innerHTML = content;

    this.style.position = 'fixed';

    const rect = this.getBoundingClientRect();
    this.pos = new Position(
      { x: rect.left, y: rect.top },
      // { x: rect.right, y: rect.top },
      // { x: rect.left, y: rect.bottom },
      { x: rect.right, y: rect.bottom },
    );
  }

  updatePosition = (): void => {
    const rect = this.getBoundingClientRect();
    this.pos.update({
      tl: { x: rect.left, y: rect.top },
      // tr: { x: rect.right, y: rect.top },
      // bl: { x: rect.left, y: rect.bottom },
      br: { x: rect.right, y: rect.bottom },
    });
  };

  overlaps = (drop: Drop): boolean => {
    // if the same drop, skip
    if (this === drop) return false;

    return this.pos.overlaps(drop.pos);
  };
}

export type RainDrops = Drop[];
