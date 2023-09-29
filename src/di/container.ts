import { container } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Config } from '@config/Config'
import { Routes } from '@presentation/http/Routes'
import { DocsController } from '@presentation/http/controllers/DocsController'
import { DocsService } from '@infrastructure/docs/DocsService'
import UserRepository from '@domain/authentication/repositories/UserRepository'
import AuthenticationService from '@domain/authentication/services/AuthenticationService'
import { LoginController } from '@presentation/http/controllers/Authentication/LoginController'
import PasswordResetController from '@presentation/http/controllers/Authentication/PasswordResetController'
import { AuthenticationRoutes } from '@presentation/http/routes/AuthenticationRoutes'
import AuthenticationMiddleware from '@presentation/http/middlewares/AuthenticationMiddleware'
import CompanyRepository from '@domain/company/repositories/CompanyRepository'
import CompanyService from '@domain/company/services/CompanyService'
import { CompanyRoutes } from '@presentation/http/routes/CompanyRoutes'
import { CompanyCreateController } from '@presentation/http/controllers/company/CompanyCreateController'
import { CompanyUpdateController } from '@presentation/http/controllers/company/CompanyUpdateController'
import { CreateUserController } from '@presentation/http/controllers/Authentication/CreateUserController'
import GetUserListController from '@presentation/http/controllers/Authentication/GetUserListController'
import GetUserController from '@presentation/http/controllers/Authentication/GetUserController'
import UpdateUserController from '@presentation/http/controllers/User/UpdateUserController'
import { PasswordChangeController } from '@presentation/http/controllers/User/PasswordChangeController'
import { UserRoutes } from '@presentation/http/routes/UserRoutes'

// Creates a new child container based on root container
const childContainer = container.createChildContainer()

// App registers
childContainer.registerSingleton(tokens.Config, Config)
childContainer.registerSingleton(tokens.Routes, Routes)

// Midlewares
childContainer.registerSingleton(
  tokens.AuthenticationMiddleware,
  AuthenticationMiddleware
)

// Docs
childContainer.registerSingleton(tokens.DocsController, DocsController)
childContainer.registerSingleton(tokens.DocsService, DocsService)

// Autentication
childContainer.registerSingleton(tokens.UserRepository, UserRepository)
childContainer.registerSingleton(tokens.LoginController, LoginController)
childContainer.registerSingleton(
  tokens.AuthenticationRoutes,
  AuthenticationRoutes
)
childContainer.registerSingleton(
  tokens.AuthenticationService,
  AuthenticationService
)
childContainer.registerSingleton(
  tokens.CreateUserController,
  CreateUserController
)
childContainer.registerSingleton(
  tokens.PasswordChangeController,
  PasswordChangeController
)
childContainer.registerSingleton(
  tokens.PasswordResetController,
  PasswordResetController
)
// User

childContainer.registerSingleton(tokens.UserRoutes, UserRoutes)
childContainer.registerSingleton(
  tokens.GetUserListController,
  GetUserListController
)
childContainer.registerSingleton(tokens.GetUserController, GetUserController)
childContainer.registerSingleton(
  tokens.UpdateUserController,
  UpdateUserController
)

// Company
childContainer.registerSingleton(tokens.CompanyRepository, CompanyRepository)
childContainer.registerSingleton(tokens.CompanyService, CompanyService)
childContainer.registerSingleton(tokens.CompanyRoutes, CompanyRoutes)
childContainer.registerSingleton(
  tokens.CompanyCreateController,
  CompanyCreateController
)
childContainer.registerSingleton(
  tokens.CompanyUpdateController,
  CompanyUpdateController
)

export { childContainer as container }
