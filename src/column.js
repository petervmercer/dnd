import React from 'react';
import styled from 'styled-components';
import Task from './task';

const Container = styled.div`
margin: 8px;
border: 1px solid lightgrey;
border-radius: 2px;
`;
const Title = styled.h3``;
const TaskList = styled.div``;

export default props => (
    <Container>
        <Title>{props.title}</Title>
        <TaskList>{props.tasks.map((task) => <Task key={task.id} task={task} />)}</TaskList>
    </Container>
)