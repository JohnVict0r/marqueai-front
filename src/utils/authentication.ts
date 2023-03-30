const APP_KEY = '@Agendita';
const TOKEN_KEY = `${APP_KEY}:Token`;
const PROFILE_KEY = `${APP_KEY}:Profile`;
const ROLES_KEY = `${APP_KEY}:Roles`;
const FIRST_ACCESS_KEY = `${APP_KEY}:First-Access`;
const ESTABLISHMENT_KEY = `${APP_KEY}:Establishment`;

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY) || null
export const setAuthToken = (token: string) =>
  localStorage.setItem(TOKEN_KEY, token)
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
export const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY)

export const getProfile = () =>
  JSON.parse(localStorage.getItem(PROFILE_KEY) || '') || null

export const setProfile = (profile: any) =>
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))

export const getRoles = () =>
  JSON.parse(localStorage.getItem(ROLES_KEY) || '') || null

export const setRoles = (roles: any[]) => {
  const rolesName = roles.map(role => role.type)
  console.log(rolesName)

  localStorage.setItem(ROLES_KEY, JSON.stringify(rolesName))
}

export const setFirstAccess = () => {
  localStorage.setItem(FIRST_ACCESS_KEY, 'true')
}

export const isFirstAccess = () =>
  localStorage.getItem(FIRST_ACCESS_KEY) ? false : true

export const getEstablishment = () =>
  JSON.parse(localStorage.getItem(ESTABLISHMENT_KEY) || '') || null

export const setEstablishment = (estblishment: any) =>
  localStorage.setItem(ESTABLISHMENT_KEY, JSON.stringify(estblishment))
