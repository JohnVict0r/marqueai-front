import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './containers/auth/Login/Login'
import SelectUser from './containers/auth/SelectUser'
import { isAuthenticated } from './utils/authentication'
import ProfessionalPrivateLayout from './layouts/ProfessionalPrivateLayout'
import PublicLayout from './layouts/PublicLayout'
import Landing from './containers/pages/Landing'
import LandingViana from './containers/pages/LandingViana'

import Profile from './containers/pages/Profile'
import Success from './containers/auth/Success'
import Terms from './containers/pages/Terms'
import PrivacyPolicy from './containers/pages/PrivacyPolicy'
import ProfessionalAppointmentsList from './containers/professional/appointments/ProfessionalAppointmentsList'
import ProfessionalAppointmentsCreate from './containers/professional/appointments/ProfessionalAppointmentsCreate'
import ProfessionalServicesList from './containers/professional/services/ProfessionalServicesList'
import ProfessionalServicesCreate from './containers/professional/services/ProfessionalServicesCreate'
import ProfessionalSchedulesList from './containers/professional/schedules/ProfessionalSchedulesList'
import ProfessionalSchedulesCreate from './containers/professional/schedules/ProfessionalSchedulesCreate'
import Welcome from './containers/auth/Welcome'
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

export const ProfessionalPrivateRoute: any = ({
  component: Component,
  ...rest
}: IPrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <ProfessionalPrivateLayout>
            <Component {...props} />
          </ProfessionalPrivateLayout>
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

        <PublicRoute exact path='/' component={Landing} />
        <PublicRoute
          exact
          path='/store/vianasbarbearia'
          component={LandingViana}
        />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/bem-vindo' component={Welcome} />
        <PublicRoute path='/success/:type' component={Success} />
        <PublicRoute exact path='/:username' component={Chat} />

        {/* PROFESSIONAL */}
        <ProfessionalPrivateRoute
          path='/professional/services'
          exact
          component={ProfessionalServicesList}
        />
        <ProfessionalPrivateRoute
          path='/professional/services/create'
          exact
          component={ProfessionalServicesCreate}
        />
        <ProfessionalPrivateRoute
          path='/professional/services/:serviceId/update'
          exact
          component={ProfessionalServicesCreate}
        />
        <ProfessionalPrivateRoute
          path='/professional/schedules'
          exact
          component={ProfessionalSchedulesList}
        />
        <ProfessionalPrivateRoute
          path='/professional/schedules/create'
          exact
          component={ProfessionalSchedulesCreate}
        />
        <ProfessionalPrivateRoute
          path='/professional/schedules/:scheduleId/update'
          exact
          component={ProfessionalSchedulesCreate}
        />
        <ProfessionalPrivateRoute
          path='/professional/appointments'
          exact
          component={ProfessionalAppointmentsList}
        />
        <ProfessionalPrivateRoute
          path='/professional/appointments/create'
          exact
          component={ProfessionalAppointmentsCreate}
        />
        <ProfessionalPrivateRoute
          path='/professional/profile'
          exact
          component={Profile}
        />

        {/*Rotas Operador*/}
        <Route path='/selecionar-modulo' component={SelectUser} />

        <Redirect
          to={{
            pathname: '/',
          }}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
