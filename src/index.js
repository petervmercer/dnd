import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './column';
import {DragDropContext} from "react-beautiful-dnd";
import styled from 'styled-components';

const Container = styled.div`
display: flex;
`;

const App = () => {

    const [dragState, setDragState] = useState(initialData);

    const _onDragStart = () => {

        document.body.style.color = 'orange';
        document.body.style.transition = 'background-color 0.2s ease';
    };

    const _onDragUpdate = update => {
        const {destination} = update;
        const opacity = destination ? destination.index/Object.keys(dragState.tasks).length : 0;
        document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    };

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

        const start = dragState.columns[source.droppableId];
        const finish = dragState.columns[destination.droppableId];


        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
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
            return;
        }

        //Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...dragState,
            columns: {
                ...dragState.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setDragState(newState);




    }

    return (
        <Container>
        <DragDropContext
            onDragEnd={_onDragEnd}
            onDragStart={_onDragStart}
            onDragUpdate={_onDragUpdate}

        >
        {dragState.columnOrder.map((columnId) => {
            const column = dragState.columns[columnId];
            const tasks = column.taskIds.map(taskId => dragState.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;

        })}
        </DragDropContext>
        </Container>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

