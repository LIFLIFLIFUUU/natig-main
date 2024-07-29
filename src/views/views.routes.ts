import { Router } from "express";
import { loadAboutPage, loadBdikaPage, loadCharactersPage } from "./views.controller";

const viewRouter = Router();

viewRouter
  .get('', (req, res) => res.render('./pages/index'))
  .get('/about', loadAboutPage)
  .get('/characters', loadCharactersPage) //('url', what to do when it  called)
  .get('/bdika', loadBdikaPage)

export default viewRouter;