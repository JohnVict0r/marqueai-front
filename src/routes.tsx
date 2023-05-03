import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './containers/auth/Login/Login'
import SignUp from './containers/auth/SignUp/SignUp'
import SelectUser from './containers/auth/SelectUser'
import { isAuthenticated } from './utils/authentication'
import PrivateLayout from './layouts/PrivateLayout'
import ManagerPrivateLayout from './layouts/ManagerPrivateLayout'
import PublicLayout from './layouts/PublicLayout'
import Home from './containers/pages/Home'
import Profile from './containers/pages/Profile'
import Success from './containers/auth/Success'
import Terms from './containers/Terms'
// import PrivacyPolicy from './containers/public/PrivacyPolicy'
import ResetPassword from './containers/auth/ResetPassword'
import VerifyEmail from './containers/auth/VerifyEmail'
import ManagerProfessionalList from './containers/manager/establishiment/ManagerProfessionalList'
import ManagerUserList from './containers/admin/ManagerUserList'
import ManagerProfessionalCreate from './containers/manager/establishiment/ManagerProfessionalCreate'
import ManagerCitizenCreate from './containers/admin/ManagerCitizenCreate'
import UserAppointmentCreate from './containers/customer/UserAppointmentCreate'
import ManagerHome from './containers/manager/Home/ManagerHome'
import ManagerEstablishmentCreate from './containers/manager/establishiment/ManagerEstablishmentCreate'
import ManagerEstablishmentAppointments from './containers/pages/ManagerEstablishmentAppointments'
import ManagerAppointmentsList from './containers/manager/professional/ManagerAppointmentsList'
import ManagerProfessionalServicesList from './containers/manager/professional/services/ManagerProfessionalServicesList'
import ManagerProfessionalServicesCreate from './containers/manager/professional/services/ManagerProfessionalServicesCreate'
import ManagerProfessionalSchedulesList from './containers/manager/professional/schedules/ManagerProfessionalSchedulesList'
import ManagerProfessionalSchedulesCreate from './containers/manager/professional/schedules/ManagerProfessionalSchedulesCreate'
import Welcome from './containers/auth/Welcome'
import UserAppointmentList from './containers/customer/UserAppointmentList'
import ManagerEstablishmentList from './containers/manager/establishiment/ManagerEstablishmentList'
import Chat from './containers/customer/Chat'
import Page404 from './containers/public/404'

import PageSuccess from './containers/public/Success'
interface IPublicRouteProps {
  component: any
}

interface IPrivateRouteProps {
  component: any
}

export const PublicRoute: any = ({
  component: Component,
  ...rest
}: IPublicRouteProps) => (
  <Route
    {...rest}
    render={props => (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    )}
  />
)

export const PrivateRoute: any = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export const ManagerPrivateRoute: any = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <ManagerPrivateLayout>
            <Component {...props} />
          </ManagerPrivateLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/termos-de-uso' component={Terms} />
        {/* <Route
          exact
          path='/politica-de-privacidade'
          component={PrivacyPolicy}
        /> */}
        <Route exact path='/404' component={Page404} />
        <Route exact path='/success' component={PageSuccess} />

        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/cadastro' component={SignUp} />
        {/*<PublicRoute path='/esqueceu-a-senha' component={ForgotPassword} /> */}
        <PublicRoute path='/reset-password/:token' component={ResetPassword} />
        <PublicRoute path='/verify-email/:token' component={VerifyEmail} />
        <PublicRoute path='/bem-vindo' component={Welcome} />
        <PublicRoute path='/success/:type' component={Success} />
        <PublicRoute path='/:username' component={Chat} />
        <PrivateRoute path='/cidadao/inicio' component={Home} />
        <PrivateRoute path='/cidadao/perfil' exact component={Profile} />
        <PrivateRoute
          path='/cidadao/agendamentos'
          exact
          component={UserAppointmentList}
        />
        <PrivateRoute
          path='/cidadao/agendamentos/cadastro'
          exact
          component={UserAppointmentCreate}
        />

        {/* PROFESSIONAL */}
        <ManagerPrivateRoute
          path='/manager/professional/home'
          exact
          component={ManagerHome}
        />
        <ManagerPrivateRoute
          path='/manager/professional/services'
          exact
          component={ManagerProfessionalServicesList}
        />
        <ManagerPrivateRoute
          path='/manager/professional/services/create'
          exact
          component={ManagerProfessionalServicesCreate}
        />
        <ManagerPrivateRoute
          path='/manager/professional/schedules'
          exact
          component={ManagerProfessionalSchedulesList}
        />
        <ManagerPrivateRoute
          path='/manager/professional/schedules/create'
          exact
          component={ManagerProfessionalSchedulesCreate}
        />

        <ManagerPrivateRoute
          path='/manager/professional/appointments'
          exact
          component={ManagerAppointmentsList}
        />
        <ManagerPrivateRoute
          path='/manager/professional/appointments/create'
          exact
          component={ManagerAppointmentsList}
        />
        <ManagerPrivateRoute
          path='/manager/professional/profile'
          exact
          component={Profile}
        />

        {/* ESTABLISHIMENT */}
        <ManagerPrivateRoute
          path='/manager/establishiment/professionais'
          exact
          component={ManagerProfessionalList}
        />
        <ManagerPrivateRoute
          path='/manager/establishiment/professionais/create'
          exact
          component={ManagerProfessionalCreate}
        />

        {/* ADMIN */}
        <ManagerPrivateRoute
          path='/admim/users'
          exact
          component={ManagerUserList}
        />
        <ManagerPrivateRoute
          path='/admim/users/create'
          exact
          component={ManagerCitizenCreate}
        />
        <ManagerPrivateRoute
          path='/admin/establishment'
          exact
          component={ManagerEstablishmentList}
        />
        <ManagerPrivateRoute
          path='/admin/establishment/create'
          exact
          component={ManagerEstablishmentCreate}
        />
        <ManagerPrivateRoute
          path='/admin/establishment/:establishmentId/agenda'
          exact
          component={ManagerEstablishmentAppointments}
        />

        {/*Rotas Operador*/}
        <Route path='/selecionar-modulo' component={SelectUser} />
        <ManagerPrivateRoute path='/customer/inicio' exact component={Home} />

        {/* <PrivateRoute path='/vaccines/:id' exact component={VaccineInfo} /> */}
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
