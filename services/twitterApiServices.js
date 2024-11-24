import axiosInstance from './request.js';

export const getLastSearchServices = async (content) => {
  try {
    const response = await axiosInstance.get(
      `https://api.apidance.pro/sapi/Search?q=${content}&cursor&sort_by=Latest`,
      {
        headers: {
          apikey: 'gx8oca02jom03zrtf0ef5ign86ahdi',
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    return {};
  }
};
