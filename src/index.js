import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './column';
import {DragDropContext} from "react-beautiful-dnd";


const App = () => {

    const [dragState, setDragState] = useState(initialData);

    const _onDragEnd = result => {
        // Add later
        const {destination, source, draggableId} = result;
        if(!destination){
            return;
        }

        if(destination.droppableId === source.droppableId &&
            destination.index === source.index){
            return;
        }

        const column = dragState.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        };

        const newState = {
            ...dragState,
            columns: {
                ...dragState.columns,
                [newColumn.id]: newColumn
            }
        }

        setDragState(newState);
    }

    return (
        <DragDropContext
            onDragEnd={_onDragEnd}

        >
        {dragState.columnOrder.map((columnId) => {
            const column = dragState.columns[columnId];
            const tasks = column.taskIds.map(taskId => dragState.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;

        })}
        </DragDropContext>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

