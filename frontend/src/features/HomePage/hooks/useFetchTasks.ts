import { useApi } from '../../../hooks/useApi';
import { getTasks } from '../../../api/tasksApi';

export const useFetchTasks = () => {
  return useApi(getTasks);
};
