import * as React from "react";
import classNames from "classnames";
import { TimelineMax } from "gsap";
import _ from "lodash";

import { FadeShrink } from "./Timelines";

import style from "./SlideCycle.mod.css";

type SlideCycleProps = {
  className?: string;
  childClassName?: string;
  timeline: TimelineMax;
  children: React.ReactNode;
  itemDuration?: number;
};

class SlideCycle extends React.Component<SlideCycleProps> {
  constructor(props: SlideCycleProps) {
    super(props);
  }

  childRefs: Array<HTMLElement | null> = [];

  setRef(ref: HTMLElement | null, index: number) {
    this.childRefs[index] = ref;
  }

  componentDidMount() {
    const { timeline, itemDuration = 5 } = this.props;
    const fadeTLs = _.map(this.childRefs, FadeShrink);

    timeline
      .staggerFromTo(this.childRefs, 0.4, { y: 80 }, { y: 0, ease: "Power4.easeOut" }, 0.08)
      .add(fadeTLs, "+=3", "normal", itemDuration);
  }

  render() {
    const { className, children, childClassName } = this.props;

    return (
      <div className={classNames(style.content, className)}>
        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            ref={(r) => this.setRef(r, i)}
            className={classNames(style.item, childClassName)}>
            {child}
          </div>
        ))}
      </div>
    );
  }
}

export default SlideCycle;
