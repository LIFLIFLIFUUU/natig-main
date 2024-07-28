import { Router } from "express";
import { loadAboutPage, loadCharactersPage } from "./views.controller";

const viewRouter = Router();

viewRouter
  .get('', (req, res) => res.render('./pages/index'))
  .get('/about', loadAboutPage)
  .get('/characters', loadCharactersPage) //('url', what to do when it  called)

export default viewRouter;