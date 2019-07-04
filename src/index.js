import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './column';


const App = () => {
    const state = initialData;

    return (
        state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map(taskId => state.tasks[taskId]);
            return <Column key={column.id} column={column} tasks={tasks} />;

        })
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

