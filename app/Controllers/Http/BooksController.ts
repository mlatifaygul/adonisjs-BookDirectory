import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Books from 'App/Models/Book'
export default class BooksController {
  public async index({ view }: HttpContextContract) {
    const books = await Books.query()
    return view.render('site/home', {
      books
    })
  }

  public async create({ }: HttpContextContract) { }

  public async store({ }: HttpContextContract) { }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
