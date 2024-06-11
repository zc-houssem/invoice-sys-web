import axios from 'axios';
import { Activity } from './types/activity';

const find = async () => {
  const { data } = await axios.get<Activity[]>(
    'http://localhost:3000/public/activity/list'
  );
  return data;
};
export const activity = { find };
