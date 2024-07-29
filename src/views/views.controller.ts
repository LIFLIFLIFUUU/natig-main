import { Request, Response } from "express";
import { getAll } from "../officeWorker/officeWorker.model";

export async function loadAboutPage(req: Request, res: Response) {
  const data = {
    text: 'קוקו הלך לגן',
    showImg: false,
    imgUrl: 'https://mtrnews.ruppin.tech/info/images/CollegeLogo.png'
  }

  res.render('./pages/about', data);
}

export async function loadCharactersPage(req: Request, res: Response) {
  const characters = [
    {
      charater_name: "Luke Skywaker",
      age: 20,
      actor: "Mark Hammil"
    },
    {
      charater_name: "Princess Leia",
      age: 20,
      actor: "Carry Fisher"
    }
  ]
  console.log(characters)
  res.render('./pages/characters', { characters });
}

export async function loadBdikaPage(req: Request, res: Response) {
  // const data = {
  //   string: "bdika"
  // }

  const data = await getAll();

  //המרה של ה ObjectId למחרוזת
  let clients = data.map((item)=> {

    let id = item._id.toString()
    return {
      ...item,
      _id: id //שמירה של המחרוזתבתכונה המתאימה
    }
  })

  //שליחת המידע לדף המתאים
  res.render('./pages/bdika', {clients});
}