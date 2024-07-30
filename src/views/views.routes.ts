import { Router } from "express";
import { loadAboutPage, loadBdikaPage, loadCharactersPage, loadClientLoginPage, loadWorkerLoginPage } from "./views.controller";
import { login } from "../officeWorker/officeWorker.controller";

const viewRouter = Router();

viewRouter
  .get('', (req, res) => res.render('./pages/index'))
  .get('/about', loadAboutPage)
  .get('/characters', loadCharactersPage) //('url', what to do when it  called)
  .get('/bdika', loadBdikaPage)
  .get('/workerLogin', loadWorkerLoginPage)
  .get('/clientLogin', loadClientLoginPage)

export default viewRouter;