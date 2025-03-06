import { AnyContainerStateNode } from '../../AppState/StateNode/ContainerStateNode';
import { StateNode } from '../../AppState/StateNode/StateNode';

const isMouseAboveThanHalfOfComponent = (
  htmlElement: HTMLElement,
  mouseEventY: number
): boolean => {
  const clientRect = htmlElement.getBoundingClientRect();
  const middleOfComponentY = clientRect.y + clientRect.height / 2;
  return middleOfComponentY >= mouseEventY;
};

export const getWhereToInsert = (
  container: AnyContainerStateNode,
  mouseY: number,
  excluded?: StateNode | null
): number => {
  const childrenWithoutExcludedSN = container.children.filter(
    (child) => child !== excluded
  );
  const findFirstAboveChildrenIndex = childrenWithoutExcludedSN.findIndex(
    (child) => isMouseAboveThanHalfOfComponent(child.component, mouseY)
  );
  const beforeIndex =
    findFirstAboveChildrenIndex === -1
      ? childrenWithoutExcludedSN.length
      : findFirstAboveChildrenIndex;
  return beforeIndex;
};
