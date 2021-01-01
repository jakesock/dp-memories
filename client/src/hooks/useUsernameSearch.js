import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import * as api from '../api';

import { setSnackbar } from '../actions/snackbar';

const useUsernameSearch = (username) => {
  const [loading, setLoading] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setUsernameTaken(null);
  }, [username]);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    if (username.length > 0) {
      setLoading(true);

      setTimeout(() => {
        const body = JSON.stringify({ username });
        api
          .isUsernameTaken(body, {
            headers: {
              'Content-Type': 'application/json',
            },
            cancelToken: source.token,
          })
          .then((res) => {
            setUsernameTaken(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (axios.isCancel(err)) {
              return;
            } else {
              dispatch(
                setSnackbar(
                  true,
                  'error',
                  'Oops! Something went wrong, please try again!',
                ),
              );
            }
          });
      }, 500);
    }

    return () => source.cancel();
  }, [dispatch, username]);

  return { loading, usernameTaken };
};

export default useUsernameSearch;
