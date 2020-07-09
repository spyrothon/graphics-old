import * as React from "react";
import _ from "lodash";

type SequencedProps = {
  onLoop?: () => unknown;
  onNext?: (index: number) => unknown;
  children: React.ReactNode;
};

type SequencedState = {
  currentChild: number;
};

// Component for sequencing Timelined components one after another. By default
// only supports a static list of components, but the sequence can be
// interrupted with by setting the `override` prop with a component to render.
class Sequenced extends React.Component<SequencedProps, SequencedState> {
  state = {
    currentChild: 0,
  };

  constructor(props: SequencedProps) {
    super(props);

    this.state = {
      currentChild: 0,
    };
  }

  componentDidUpdate(_prevProps: SequencedProps) {
    // TODO: Check for override prop
  }

  handleComplete() {
    const { children, onNext, onLoop } = this.props;
    const { currentChild } = this.state;

    const nextChild = currentChild + 1;

    if (nextChild >= React.Children.count(children)) {
      onLoop?.();
    }

    const nextIndex = nextChild % React.Children.count(children);
    onNext?.(nextIndex);

    this.setState({ currentChild: nextIndex });
  }

  render() {
    const { children } = this.props;
    const { currentChild } = this.state;

    const childrenArray = React.Children.toArray(children);

    // Safety modulo in case an update removed children somehow
    const child = childrenArray[currentChild % React.Children.count(children)];

    if (child == null) return null;

    // @ts-ignore idk this isn't important. child is always a ReactNode.
    const controlledChild = React.cloneElement(child, {
      onComplete: this.handleComplete.bind(this),
    });

    return controlledChild;
  }
}

export default Sequenced;
