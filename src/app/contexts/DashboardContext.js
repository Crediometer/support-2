import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const getSession = () => {
  // const navigate = useNavigate();

  const token = sessionStorage.getItem('accessToken');

  if (!isValidToken(token)) {
    // navigate('/auth/signin')
  }

  return token;
};
const jwtAuthHeader = {
  headers: {
    Authorization: 'Bearer ' + getSession(),
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DASHBOARD': {
      var b = {
        ...state,
        loaded: true,
        overviews: action.payload,
      };

      return b;
    }
    case 'LOAD_INVENTORY': {
      var b = {
        ...state,
        loaded: true,
        inventory: action.payload,
      };

      return b;
    }

    case 'LOAD_SAVINGS': {
      console.log('all here data', action);
      var b = {
        ...state,
        loaded: true,
        savings: action.payload,
      };

      return b;
    }

    case 'DELETE_NOTIFICATION': {
      return {
        ...state,
        overviews: action.payload,
      };
    }
    case 'CLEAR_NOTIFICATIONS': {
      return {
        ...state,
        overviews: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const DashboardContext = createContext({
  overviews: {},
  inventory: {},
  loaded: false,
  savings: {},
  deleteNotification: () => {},
  clearOverviews: () => {},
  getDashboard: () => {},
  getSavings: () => {},
  getInventoryData: () => {},
  createNotification: () => {},
});

export const DashboardProvider = ({ settings, children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const deleteNotification = async (notificationID) => {
    try {
      const res = await axios.post('/api/notification/delete', {
        id: notificationID,
      });
      dispatch({
        type: 'DELETE_NOTIFICATION',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const clearNotifications = async () => {
    try {
      const res = await axios.post('/api/notification/delete-all');
      dispatch({
        type: 'CLEAR_NOTIFICATIONS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getInventoryData = async () => {
    try {
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/inventoryData',
        jwtAuthHeader
      );
      dispatch({
        type: 'LOAD_INVENTORY',
        payload: {},
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getDashboard = async () => {
    try {
      console.log('------------ kuje');

      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/dashboard',
        jwtAuthHeader
      );

      dispatch({
        type: 'LOAD_DASHBOARD',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getSavings = async () => {
    try {
      console.log('------------ kuhdvZje');
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/dashboard',
        jwtAuthHeader
      );
      dispatch({
        type: 'LOAD_SAVINGS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const createNotification = async (notification) => {
    try {
      const res = await axios.post('/api/notification/add', {
        notification,
      });
      dispatch({
        type: 'CREATE_NOTIFICATION',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // if(){
    getDashboard();
    // }else{
    //     getSavings();
    // }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        overviews: state.overviews ?? {},
        inventory: state.inventory ?? {},
        savings: state.savings ?? {},
        loaded: state.loaded ?? false,
        deleteNotification,
        clearNotifications,
        getDashboard,
        getSavings,
        getInventoryData,

        createNotification,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
