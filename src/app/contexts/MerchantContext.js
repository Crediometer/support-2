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
        merchant: action.payload,
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

const MerchantContext = createContext({
  loaded: !false,
  merchant: {},

  getDashboard: () => {},
  getNewDashboard: () => {},
});

export const MerchantProvider = ({ settings, children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const addReader = async (phoneNumber, uuid) => {
    console.log('add reader .... got here????', phoneNumber, uuid);
    try {
      const response = await axios.post(
        'https://credio-api.herokuapp.com/api/v1/admin/merchant/add/reader',
        {
          phoneNumber,
          uuid,
        }
      );

      dispatch({
        type: 'ADD_READER',
        payload: {},
      });
    } catch (e) {
      console.error(e);
    }
  };
  const getDashboard = async () => {
    try {
      console.log('------------ kuje');
      const res = await axios.get(
        'https://credio-api.herokuapp.com/api/v1/admin/merchant/overview',
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
        'https://credio-api.herokuapp.com/api/v1/admin/merchant/overview?date=' + date,
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

  useEffect(() => {
    console.log('cautions fee');
    // if(){
    getDashboard();
    // }else{
    //     getSavings();
    // }
  }, []);

  return (
    <MerchantContext.Provider
      value={{
        merchant: state.merchant ?? {},
        loaded: state.loaded ?? false,
        getDashboard,
        getNewDashboard,
        addReader,
      }}
    >
      {children}
    </MerchantContext.Provider>
  );
};

export default MerchantContext;
