// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BooksController {
    public async index({ view }) {
        return view.render('site/home', {
            title: "Home Page",
            body: "Book List"
        })
    }
}
