// upload Video
import { commonAPI } from "./commonAPI";
import { serverUrl } from "./serverUrl";

export const uploadVideo = async (reqBody) => {
  // call POST http request to "localHost:4000/videos" to add videos to json server and return response
  return await commonAPI("POST", `${serverUrl}/videos`, reqBody);
};

// get all videos from json server
export const getAllVideos = async () => {
  // make GET  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("GET", `${serverUrl}/videos`, "");
};

// get a specific videos from json server
export const getAVideo = async (id) => {
  // make GET  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("GET", `${serverUrl}/videos/${id}`, "");
};

// delete a specific videos from json server
export const deleteVideo = async (id) => {
  // make DELETE "localHost:4000/videos" to delete videos from json server
  return await commonAPI("DELETE", `${serverUrl}/videos/${id}`, "{}");
};

export const addToHistory = async (videoDetails) => {
  return await commonAPI("POST", `${serverUrl}/history`, videoDetails);
};

export const getAllHisory = async () => {
  // make GET  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("GET", `${serverUrl}/history`, "");
};

export const addCategory = async (reqBody) => {
  // call POST http request to "localHost:4000/videos" to add category to json server and return response
  return await commonAPI("POST", `${serverUrl}/categories`, reqBody);
};

export const getCategory = async () => {
  // make GET  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("GET", `${serverUrl}/categories`, "");
};

export const deleteCategory = async (id) => {
  // make DELETE "localHost:4000/videos" to delete videos from json server
  return await commonAPI("DELETE", `${serverUrl}/categories/${id}`, {});
};

export const getAllCategory = async () => {
  // make GET  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("GET", `${serverUrl}/categories`, "");
};

// update category
export const updateCategory = async (id, body) => {
  // make Update  "localHost:4000/videos" to get all videos from json server to view component
  return await commonAPI("PUT", `${serverUrl}/categories/${id}`, body);
};

// delete a specific videos from json server
export const deleteVideoHistory = async (id) => {
  // make DELETE "localHost:4000/videos" to delete videos from json server
  return await commonAPI("DELETE", `${serverUrl}/history/${id}`, "{}");
};
