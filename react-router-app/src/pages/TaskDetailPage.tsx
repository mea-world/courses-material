import React from 'react';
import { useParams } from 'react-router-dom';
import { Screen } from '../components/Screen';

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();

  // Fetch task details based on taskId here

  return (
    <Screen>
      <div>
        <h2>Task Detail Page</h2>
        <p>Task ID: {taskId}</p>
        {/* Display task details here */}
      </div>
    </Screen>
  );
};

export default TaskDetailPage; 