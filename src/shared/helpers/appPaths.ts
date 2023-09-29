import { generatePath } from './generatePath'

const AppHost = process.env.APP_HOST

const AppPath = {
  InitiativesDetails: '/app/initiatives/:id',
  Profile: '/app/profile/:id',
  ProfileEdit: '/app/profile/edit',
  PasswordReset: '/app/password-reset-confirmation/:token',
}

function composeAppPath(pathKey: keyof typeof AppPath, params?: {}) {
  return `${AppHost}${generatePath(AppPath[pathKey], params)}`
}

export { AppHost, AppPath, composeAppPath }
