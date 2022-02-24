import { useEffect, useReducer, useCallback } from "react";
import ReportsApi from "@Services/reports.api";

// Action Types
const LOADING = "LOADING";
const SUCCESS = "SUCCESS";
const ERROR = "ERROR";

// Action Creators
const loading = () => ({ type: LOADING });
const success = (data) => ({ type: SUCCESS, payload: data });
const error = (errorMessage) => ({ type: ERROR, payload: errorMessage });

// Initial State
const initialState = {
  data: [],
  loading: true,
  error: false,
};

// Reducer
const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SUCCESS":
      return { ...state, data: payload, loading: false };
    case "ERROR":
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export default function useReport() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const refreshReports = useCallback(async (e) => {
    dispatch(loading());

    if (e) e.preventDefault();
    let reports = [];

    try {
      reports = await ReportsApi.get();
      dispatch(success(reports.docs));
    } catch (err) {
      console.log(err);
      dispatch(error(err));
    }
  });

  const findReports = useCallback(async (query, option) => {
    if (query.length === 0) {
      return;
    }

    dispatch(loading());

    let result = [];
    switch (option) {
      case "labSrNo":
        result = await ReportsApi.searchByLabSrNo(query);
        break;

      case "fullName":
        result = await ReportsApi.searchByName(query);
        break;

      case "passport":
        result = await ReportsApi.searchByPassportNo(query);
        break;

      case "dateExamined":
        result = await ReportsApi.searchByExaminedDate(query);
        break;

      default:
        result = [];
    }

    if (!result.empty) {
      dispatch(success(result.docs));
      return;
    }

    dispatch(success([]));
  });

  const deleteReport = useCallback(async (id) => {
    dispatch(loading(true));
    const { photoName } = state.data.find((report) => report.id === id).data();

    try {
      await ReportsApi.delete(photoName, id);
    } catch (err) {
      dispatch(error(err));
      console.log(err);
    }

    const newData = state.data.filter((report) => report.id !== id);
    dispatch(success(newData));
  });

  // TODO: implement unmount
  useEffect(() => {
    refreshReports();
  }, []);

  return {
    data: state.data,
    loading: state.fetching,
    error: state.error,
    refreshReports,
    deleteReport,
    findReports,
  };
}
