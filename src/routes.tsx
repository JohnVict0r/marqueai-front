import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
// import VaccineList from './containers/pages/VaccineList'
// import VaccineInfo from './containers/pages/VacinneInfo'
import Login from './containers/Authentication/Login'
import SignUp from './containers/Authentication/SignUp'
import ProfessionalSignUp from './containers/pages/ProfessionalSignUp'
import ProfileVaccineCreate from './containers/pages/ProfileVacinneCreate'
import SelectUser from './containers/pages/SelectUser'
/* import ProfileVaccineUpdate from './containers/pages/ProfileVacinneUpdate' */
import { isAuthenticated } from './utils/authentication'
import PrivateLayout from './containers/Layout/PrivateLayout'
import ManagerPrivateLayout from './containers/Layout/ManagerPrivateLayout'
import PublicLayout from './containers/Layout/PublicLayout'
import Home from './containers/pages/Home'
import VaccineList from './containers/pages/VaccineList'
import UserAppointmentList from './containers/pages/UserAppointmentList'
import ManagerVaccineList from './containers/pages/ManagerVaccineList'
import Profile from './containers/pages/Profile'
import Welcome from './containers/pages/Welcome'
import Success from './containers/pages/Success'
import Terms from './containers/Public/Terms'
import PrivacyPolicy from './containers/Public/PrivacyPolicy'
// import ForgotPassword from './containers/pages/ForgotPassword'
import ResetPassword from './containers/pages/ResetPassword'
import VerifyEmail from './containers/pages/VerifyEmail'
import ManagerOperatorList from './containers/pages/ManagerOperatorList'
import ManagerProfessionalList from './containers/pages/ManagerProfessionalList'
import ManagerUserList from './containers/pages/ManagerUserList'
import ManagerProfessionalCreate from './containers/pages/ManagerProfessionalCreate'
import ManagerOperatorCreate from './containers/pages/ManagerOperatorCreate'
import ManagerCitizenCreate from './containers/pages/ManagerCitizenCreate'
import UserAppointmentCreate from './containers/pages/UserAppointmentCreate'
import ManagerHome from './containers/Manager/Home/ManagerHome'
import ManagerEstablishmentCreate from './containers/pages/ManagerEstablishmentCreate'
import ManagerEstablishmentAppointments from './containers/pages/ManagerEstablishmentAppointments'
import ManagerEstablishmentHours from './containers/pages/ManagerEstablishmentHours'
import ManagerEstablishmentList from './containers/pages/ManagerEstablishmentList'
import ManagerAppointmentsList from './containers/pages/ManagerAppointmentsList'

// módulos
import ManagerPuzzleList from './containers/Manager/Puzzle/ManagerPuzzleList'
import ManagerPuzzleCreate from './containers/Manager/Puzzle/ManagerPuzzleCreate'
import ManagerPuzzleItemList from './containers/Manager/Puzzle/Item/ManagerPuzzleItemList'
import ManagerPuzzleItemCreate from './containers/Manager/Puzzle/Item/ManagerPuzzleItemCreate'
import ManagerPuzzleSchedulableList from './containers/Manager/Puzzle/schedulable/ManagerPuzzleSchedulableList'
import ManagerPuzzleSchedulableCreate from './containers/Manager/Puzzle/schedulable/ManagerPuzzleSchedulableCreate'
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
        <Route path='/termos-de-uso' component={Terms} />
        <Route path='/politica-de-privacidade' component={PrivacyPolicy} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/cadastro' component={SignUp} />
        <PublicRoute
          path='/cadastro-profissional'
          component={ProfessionalSignUp}
        />
        {/*<PublicRoute path='/esqueceu-a-senha' component={ForgotPassword} /> */}
        <PublicRoute path='/reset-password/:token' component={ResetPassword} />
        <PublicRoute path='/verify-email/:token' component={VerifyEmail} />
        <PublicRoute path='/bem-vindo' component={Welcome} />
        <PublicRoute path='/success/:type' component={Success} />
        <PrivateRoute path='/cidadao/inicio' component={Home} />
        <PrivateRoute path='/cidadao/perfil' exact component={Profile} />
        <PrivateRoute path='/cidadao/vacinas' exact component={VaccineList} />
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

        {/*   Rotas do gestor */}
        <ManagerPrivateRoute
          path='/gestao/modulos'
          exact
          component={ManagerPuzzleList}
        />
        <ManagerPrivateRoute
          path='/gestao/modulos/cadastro'
          exact
          component={ManagerPuzzleCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/modulos/:puzzle_id/itens'
          exact
          component={ManagerPuzzleItemList}
        />
        <ManagerPrivateRoute
          path='/gestao/modulos/:puzzle_id/itens/cadastro'
          exact
          component={ManagerPuzzleItemCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/modulos/:puzzle_id/horarios'
          exact
          component={ManagerPuzzleSchedulableList}
        />
        <ManagerPrivateRoute
          path='/gestao/modulos/:puzzle_id/horarios/cadastro'
          exact
          component={ManagerPuzzleSchedulableCreate}
        />

        <ManagerPrivateRoute
          path='/gestao/agendamentos'
          exact
          component={ManagerAppointmentsList}
        />
        <ManagerPrivateRoute
          path='/gestao/horarios'
          exact
          component={ManagerPuzzleSchedulableList}
        />
        <ManagerPrivateRoute
          path='/gestao/horarios/cadastro'
          exact
          component={ManagerPuzzleSchedulableCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/vacinas'
          exact
          component={ManagerVaccineList}
        />
        <ManagerPrivateRoute
          path='/gestao/profissionais'
          exact
          component={ManagerProfessionalList}
        />
        <ManagerPrivateRoute
          path='/gestao/profissionais/cadastro'
          exact
          component={ManagerProfessionalCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/operadores/cadastro'
          exact
          component={ManagerOperatorCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/cidadaos/cadastro'
          exact
          component={ManagerCitizenCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/operadores'
          exact
          component={ManagerOperatorList}
        />
        <ManagerPrivateRoute
          path='/gestao/cidadaos'
          exact
          component={ManagerUserList}
        />
        <ManagerPrivateRoute
          path='/gestao/estabelecimentos'
          exact
          component={ManagerEstablishmentList}
        />
        <ManagerPrivateRoute
          path='/gestao/estabelecimentos/cadastro'
          exact
          component={ManagerEstablishmentCreate}
        />
        <ManagerPrivateRoute
          path='/gestao/estabelecimentos/:establishmentId/agenda'
          exact
          component={ManagerEstablishmentAppointments}
        />
        <ManagerPrivateRoute
          path='/gestao/estabelecimentos/:establishmentId/agenda/:data'
          exact
          component={ManagerEstablishmentHours}
        />
        <ManagerPrivateRoute
          path='/gestao/estabelecimentos/:establishmentId/agendamentos'
          exact
          component={ManagerAppointmentsList}
        />
        <ManagerPrivateRoute
          path='/gestao/inicio'
          exact
          component={ManagerHome}
        />

        {/*Rotas Operador*/}
        <ManagerPrivateRoute
          path='/gestao/vacinas/cadastro'
          exact
          component={ProfileVaccineCreate}
        />
        <Route path='/selecionar-modulo' component={SelectUser} />
        {/*  <PrivateRoute
          path='/cidadao/vacinas/:id/atualizar'
          exact
          component={ProfileVaccineUpdate}
        /> */}
        <ManagerPrivateRoute path='/gestao/inicio' exact component={Home} />
        <ManagerPrivateRoute path='/gestao/perfil' exact component={Profile} />

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
