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
    case 'LOAD_SAVINGS': {
      var b = {
        ...state,
        loaded: true,
        credio: action.payload,
      };

      return b;
    }
    case 'CLEAR_TRANSACTIONS': {
      var b = {
        ...state,
        loadedTranx: false,
        transactions: [],
      };

      return b;
    }
    case 'STATUS_CHANGE': {
      var data = state.credio;
      var foundIndex = data.data.allUsers.findIndex(
        (x) => x.phoneNumber == action.payload.data.phoneNumber
      );
      console.log('cleaning agent --- ', data.data.allUsers[foundIndex]);
      data.data.allUsers[foundIndex] = action.payload.data;
      var b = {
        ...state,

        credio: data,
      };

      return b;
    }
    case 'LOAD_TRANSACTIONS': {
      console.log('all trabnx data', action);
      var b = {
        ...state,
        loadedTranx: true,
        transactions: action.payload,
      };

      return b;
    }
    case 'ADD_READER': {
      return { ...state };
    }

    default: {
      return { ...state };
    }
  }
};

const CredioContext = createContext({
  loaded: !false,
  loadedTranx: false,
  transactions: [],
  credio: {},
  changeStatus: () => {},
  getDashboard: () => {},
  getNewDashboard: () => {},
  getTransactions: () => {},
});

export const CredioProvider = ({ settings, children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const getDashboard = async () => {
    try {
      console.log('------------ kuje');
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/credio/overview',
        jwtAuthHeader
      );
      console.log('Best detective ---- ', res.data);
      dispatch({
        type: 'LOAD_SAVINGS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getNewDashboard = async (date) => {
    try {
      console.log('------------ kuje new get new data ', date);
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/credio/overview?date=' + date,
        jwtAuthHeader
      );
      console.log('Best detective ---- ', res.data);
      dispatch({
        type: 'LOAD_SAVINGS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getTransactions = async (number) => {
    try {
      dispatch({
        type: 'CLEAR_TRANSACTIONS',
        payload: {},
      });
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/credio/transactions?phoneNumber=' + number,
        jwtAuthHeader
      );
      console.log('Best detective ---- ', res.data);
      dispatch({
        type: 'LOAD_TRANSACTIONS',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };
  const changeStatus = async (redFlag, number) => {
    try {
      const res = await axios.put(
        'https://credio-api.herokuapp.com/api/v1/admin/credio/change/status',
        {
          number,
          redFlag,
        }
      );
      console.log('Best detective ---- ', res.data);
      dispatch({
        type: 'STATUS_CHANGE',
        payload: res.data,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <CredioContext.Provider
      value={{
        credio: state.credio ?? {},
        loaded: state.loaded ?? false,
        loadedTranx: state.loadedTranx ?? false,
        transactions: state.transactions ?? [],
        getDashboard,
        getTransactions,
        getNewDashboard,
        changeStatus,
      }}
    >
      {children}
    </CredioContext.Provider>
  );
};

export default CredioContext;
