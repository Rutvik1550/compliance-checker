import { API_PATHS } from 'src/routes/paths';
import axiosInstance from '../axios';

export const getCandidates = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.candidate);
    if (res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log('Error with getCandidates: ', error);
    return { error };
  }
};

export const addCandidates = async (data) => {
  try {
    const res = await axiosInstance.post(API_PATHS.candidate, data);
    if (res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log('Error with addCandidates: ', error);
    return { error };
  }
};

export const editCandidates = async (id, data) => {
  try {
    const res = await axiosInstance.put(`${API_PATHS.candidate}/${id}`, data);
    if (res?.data) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.log('Error with getCandidates: ', error);
    return { error };
  }
};
