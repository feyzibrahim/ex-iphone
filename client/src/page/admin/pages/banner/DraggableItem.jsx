import React from "react";
import { useDrag, useDrop } from "react-dnd";

const DraggableItem = ({ id, children, index, moveItem }) => {
  const [, ref] = useDrag({
    type: "DRAGGABLE_ITEM",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "DRAGGABLE_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={{ cursor: "move" }}>
      {children}
    </div>
  );
};

export default DraggableItem;
