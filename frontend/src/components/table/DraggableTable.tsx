import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import React from 'react';

type DraggableListProps<T> = {
  items: T[];
  onOrderChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  isDisabled?: boolean;
};

/**
 * Implementa la lógica del drag and drop.
 *
 * Se puede "deshabilitar", y al hacer algún cambio en el orden,
 * llama a una función (del componente padre) que actualiza la lista de elementos.
 */
const DraggableList = <T extends { id: string }>({
  items,
  onOrderChange,
  renderItem,
  isDisabled = false,
}: DraggableListProps<T>) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    onOrderChange(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable
                draggableId={item.id}
                index={index}
                isDragDisabled={isDisabled}
                key={item.id}
              >
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      marginBottom: '8px',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {renderItem(item, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
