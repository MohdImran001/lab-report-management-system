import {
  CACHE_NAME,
  TEST_REPORT_URL,
  FINAL_REPORT_URL,
  STAMP_URL,
} from "./constants";

const fetchAndCacheData = async (url) => {
  let response;

  try {
    const cacheStorage = await caches.open(CACHE_NAME);
    await cacheStorage.add(url);
    response = await cacheStorage.match(url);
  } catch (err) {
    console.log(err);
  }

  return response;
};

export const fetchCachedData = async (url) => {
  let response;

  try {
    const cacheStorage = await caches.open(CACHE_NAME);
    response = await cacheStorage.match(url);
  } catch (err) {
    console.log(err);
  }

  if (!response || !response.ok) {
    return fetchAndCacheData(url);
  }

  return response;
};

export const cacheDataOnLoad = async () => {
  try {
    const cacheStorage = await caches.open(CACHE_NAME);
    const keys = await cacheStorage.keys();
    if (keys.length < 3) {
      await cacheStorage.addAll([TEST_REPORT_URL, FINAL_REPORT_URL, STAMP_URL]);
    }
  } catch (err) {
    console.log("Caching Error => ", err);
  }
};

// reset cache
export const resetCache = async () => {
  console.log("resetting cache storage...");
  try {
    const cacheStorage = await caches.open(CACHE_NAME);
    await cacheStorage.delete(FINAL_REPORT_URL);
    await cacheStorage.delete(TEST_REPORT_URL);
    await cacheStorage.addAll([TEST_REPORT_URL, FINAL_REPORT_URL]);
  } catch (err) {
    console.log("failed to update cache, please reload the app! => ", err);
  }
};
