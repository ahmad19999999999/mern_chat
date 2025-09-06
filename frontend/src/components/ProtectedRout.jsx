import React from 'react';
import Loader from './Loader';
import { Navigate } from 'react-router-dom';

const ProtecetdRout = ({element}) => {
// const { isAuthenticated, loading ,user} = useSelector((state) => state.user);

  if (loading) {
    return <Loader/>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
}
export default ProtecetdRout