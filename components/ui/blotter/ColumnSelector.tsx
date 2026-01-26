"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Column } from "@tanstack/react-table";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

interface ColumnSelectorProps<
  TData = Record<string, unknown>,
  TValue = unknown,
> {
  columns: Column<TData, TValue>[];
  onColumnOrderChange: (sourceIndex: number, destinationIndex: number) => void;
}

export function ColumnSelector<
  TData = Record<string, unknown>,
  TValue = unknown,
>({ columns, onColumnOrderChange }: ColumnSelectorProps<TData, TValue>) {
  const [visible, setVisible] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex !== destinationIndex) {
      onColumnOrderChange(sourceIndex, destinationIndex);
    }
  };

  return (
    <>
      <Button
        icon="pi pi-sliders-h"
        className="p-button-text p-button-sm hover:text-gray-200"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Column Order"
        visible={visible}
        onHide={() => setVisible(false)}
        className="w-[90vw] max-w-md"
        draggable={false}
        resizable={false}
        headerClassName="bg-gray-800 border-b border-gray-700 text-gray-200 p-3"
        contentClassName="bg-gray-900 p-0"
      >
        <div className="space-y-3 p-4">
          <p className="text-xs text-gray-400 mb-3">
            Drag and drop to reorder columns
          </p>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="columns">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-1.5"
                >
                  {columns.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center p-2.5 bg-gray-800 rounded border border-gray-700 hover:bg-gray-750 transition-colors"
                        >
                          <div
                            {...provided.dragHandleProps}
                            className="cursor-move text-gray-500 hover:text-gray-300 mr-2.5"
                          >
                            <i className="pi pi-bars text-xs"></i>
                          </div>

                          <span className="text-xs font-medium text-gray-200">
                            {typeof column.columnDef.header === "string"
                              ? column.columnDef.header
                              : column.id}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Dialog>
    </>
  );
}
