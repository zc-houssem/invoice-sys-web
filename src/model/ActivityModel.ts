import { activity } from '@/api/activity';
import { Activity } from '@/api/types/activity';
import { makeAutoObservable, action, observable } from 'mobx';

class ActivityModel {
  activities: Activity[] = [];

  constructor() {
    makeAutoObservable(this, {
      activities: observable,
      fetchActivities: action,
    });
  }

  fetchActivities = async () => {
    this.activities = await activity.find();
  };
}

const activityModel = new ActivityModel();
export default activityModel;
