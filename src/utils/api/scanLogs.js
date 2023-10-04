import { API_PATHS } from 'src/routes/paths';
import axiosInstance from '../axios';

export const getScanLogs = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.scanLogs);
    if (res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log('Error with getScanLogs: ', error);
    return { error };
  }
};

export const addTrigger = async (data) => {
  try {
    const res = await axiosInstance.post(API_PATHS.trigger, data);
    if (res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log('Error with addTrigger: ', error);
    return { error };
  }
};