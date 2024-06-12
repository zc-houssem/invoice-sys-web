import { activity } from '@/api/activity';
import { Activity } from '@/api/types/activity';
import { makeAutoObservable, action, observable } from 'mobx';

class ActivityModel {
  activities: Activity[] = [];
  response: { success: boolean; message: string } = { success: false, message: '' };
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      activities: observable,
      response: observable,
      createActivity: action,
      fetchActivities: action,
      removeActivity: action
    });
  }

  fetchActivities = async () => {
    this.activities = (await activity.find()).data;
  };

  async createActivity(label: string) {
    const data = {
      label: label
    };
    try {
      await activity.create(data);
      this.response = { success: true, message: 'Activity added successfully' };
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        this.response = { success: false, message: 'Activity already exists' };
      } else {
        this.response = { success: false, message: 'An unexpected error occurred' };
      }
    }
    await this.fetchActivities();
  }

  removeActivity = async (id: number) => {
    try {
      await activity.remove(id);
      this.response = { success: true, message: 'Activity removed successfully' };
      this.activities = this.activities.filter((activity) => activity.id != id);
    } catch (error: any) {
      this.response = { success: false, message: 'An unexpected error occurred' };
    }
  };
}

const activityModel = new ActivityModel();
export default activityModel;
