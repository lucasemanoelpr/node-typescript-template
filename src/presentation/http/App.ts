import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { Config } from '@config/Config'
import { tokens } from '@di/tokens'

import { inject, injectable } from 'tsyringe'
import { Routes } from './Routes'

import globalHandlingErrors from './middlewares/globalHandlingErrors'

@injectable()
export class App {
  public server: Express
  constructor(
    @inject(tokens.Config)
    private config: Config,

    @inject(tokens.Routes)
    private routes: Routes
  ) {
    const { sessionSecret } = this.config.get()
    this.server = express()

    this.server.use(
      cors({
        origin: ['https://api.getcomtext.com', 'https://getcomtext.com'],
        credentials: true,
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
      })
    )
    this.server.use(cookieParser(sessionSecret))
    this.server.use(bodyParser.json())

    this.setupRoutes()
    this.setupErrors()
  }

  public getServer() {
    return this.server
  }

  private setupRoutes() {
    this.server.use(this.routes.setupRouter())
  }

  private setupErrors() {
    this.server.use(globalHandlingErrors)
  }
  /**
   * Listens to specified port and starts the application.
   */
  public listen() {
    const { port } = this.config.get()
    console.log(`Starting appplication on port ${port}`)

    this.server.listen(port)

    return this
  }
}
