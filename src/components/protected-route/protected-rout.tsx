import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import { isAuthCheckedSelector } from '../../services/slices/user';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const fromPage = location.state?.from || { pathname: '/' };
    return <Navigate replace to={fromPage} />;
  }

  return children;
};
