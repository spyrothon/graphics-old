import * as React from "react";
import { TimelineMax } from "gsap";

type SlideCycleProps = {
  timeline: TimelineMax;
  children: React.ReactNode;
  childClassName?: string;
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
    const { timeline } = this.props;

    timeline.staggerFromTo(
      this.childRefs,
      0.4,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, ease: "Power3.easeInOut" },
      0.05,
    );
  }

  render() {
    const { children, childClassName } = this.props;

    return React.Children.map(children, (child, i) => (
      <div key={i} ref={(r) => this.setRef(r, i)} className={childClassName}>
        {child}
      </div>
    ));
  }
}

export default SlideCycle;
