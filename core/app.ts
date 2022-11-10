import express, { Application, Router } from "express"

export let app: Application = express() // application express

export let router: Router = Router() // store context router

export let groups: any = [] // Router group

export default express
