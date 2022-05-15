// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoriesController {
    public async index({ view }) {
        return view.render('site/categories', {
            title: "Categories Page",
            body: "Categori List"
        })
    }
}
