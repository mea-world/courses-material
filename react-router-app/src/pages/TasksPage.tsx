import React from 'react';
import TaskList from '../components/TaskList';
import { Screen } from '../components/Screen';

const TasksPage: React.FC = () => {
  return (
    <Screen>
      <TaskList />
    </Screen>
  );
};

export default TasksPage; 