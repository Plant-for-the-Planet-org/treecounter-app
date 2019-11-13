import { lazy } from 'react';
const Login = lazy(() => import('./Login/index'));
const SignUp = lazy(() => import('./SignUp/SignUp'));

export { Login, SignUp };
