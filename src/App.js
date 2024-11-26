import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from './tasksSlice';
import { Provider } from 'react-redux';
import store from './store';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <p>Loading tasks...</p>;
  }

  if (status === 'failed') {
    return <p>Error loading tasks: {error}</p>;
  }

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>
              <strong>{task.title}</strong> - {task.completed ? 'Completed' : 'Not Completed'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <TaskList />
    </Provider>
  );
}

export default App;
