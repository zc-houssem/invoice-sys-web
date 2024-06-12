import axios from 'axios';
import { Activity } from './types/activity';

export type CreateActivityDto = Pick<Activity, 'label'>;

const find = async () => {
  const { data, status } = await axios.get<Activity[]>(
    'http://localhost:3000/public/activity/list'
  );
  return { data, status };
};

const create = async (activity: CreateActivityDto) => {
  const { data, status } = await axios.post<Activity>(
    'http://localhost:3000/public/activity',
    activity
  );
  return { data, status };
};

const remove = async (id: number) => {
  const { data, status } = await axios.delete<Activity>(
    `http://localhost:3000/public/activity/${id}`
  );
  return { data, status };
};

export const activity = { find, create, remove };
