import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './containers/auth/Login/Login'
import SelectUser from './containers/auth/SelectUser'
import { isAuthenticated } from './utils/authentication'
import PrivateLayout from './layouts/PrivateLayout'
import ManagerPrivateLayout from './layouts/ManagerPrivateLayout'
import PublicLayout from './layouts/PublicLayout'
import Home from './containers/pages/Home'
import Profile from './containers/pages/Profile'
import Success from './containers/auth/Success'
import Terms from './containers/pages/Terms'
import PrivacyPolicy from './containers/pages/PrivacyPolicy'
import ManagerProfessionalList from './containers/Manager/establishiment/ManagerProfessionalList'
import ManagerUserList from './containers/admin/ManagerUserList'
import ManagerProfessionalCreate from './containers/Manager/establishiment/ManagerProfessionalCreate'
import ManagerCitizenCreate from './containers/admin/ManagerCitizenCreate'
import ManagerHome from './containers/Manager/Home/ManagerHome'
import ManagerEstablishmentCreate from './containers/Manager/establishiment/ManagerEstablishmentCreate'
import ManagerEstablishmentAppointments from './containers/pages/ManagerEstablishmentAppointments'
import ManagerProfessionalAppointmentsList from './containers/Manager/professional/appointments/ManagerProfessionalAppointmentsList'
import ManagerProfessionalAppointmentsCreate from './containers/Manager/professional/appointments/ManagerProfessionalAppointmentsCreate'
import ManagerProfessionalServicesList from './containers/Manager/professional/services/ManagerProfessionalServicesList'
import ManagerProfessionalServicesCreate from './containers/Manager/professional/services/ManagerProfessionalServicesCreate'
import ManagerProfessionalSchedulesList from './containers/Manager/professional/schedules/ManagerProfessionalSchedulesList'
import ManagerProfessionalSchedulesCreate from './containers/Manager/professional/schedules/ManagerProfessionalSchedulesCreate'
import Welcome from './containers/auth/Welcome'
import ManagerEstablishmentList from './containers/Manager/establishiment/ManagerEstablishmentList'
import Chat from './containers/customer/Chat'
import Page404 from './containers/pages/404'

import PageSuccess from './containers/pages/Success'
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
        <Route
          exact
          path='/politica-de-privacidade'
          component={PrivacyPolicy}
        />
        <Route exact path='/404' component={Page404} />
        <Route exact path='/success' component={PageSuccess} />

        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/bem-vindo' component={Welcome} />
        <PublicRoute path='/success/:type' component={Success} />
        <PublicRoute exact path='/:username' component={Chat} />

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
          component={ManagerProfessionalAppointmentsList}
        />
        <ManagerPrivateRoute
          path='/manager/professional/appointments/create'
          exact
          component={ManagerProfessionalAppointmentsCreate}
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
