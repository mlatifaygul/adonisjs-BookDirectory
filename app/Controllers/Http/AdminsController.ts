import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Categories from 'App/Models/Category'
import Book from 'App/Models/Book'

export default class AdminsController {
  // GET
  public async index({ view, request }: HttpContextContract) {

    const limit = 10
    const pages = request.input('page', 1)

    const books = await Book.query().from('books')
    .select('*').orderBy('id', 'asc').paginate(pages, limit)
    books.baseUrl('/admin')
    return view.render('site/admin/admin', {
      books
    })
  }
  public async category({ view }: HttpContextContract) {
    const categories = await Categories.query().from('categories')
    return view.render('site/admin/admin-categories', {
      categories
    })
  }
  //GET
  public async create({ }: HttpContextContract) {
  }
  //POST
  public async store({ }: HttpContextContract) { }
  //GET :id
  public async show({ }: HttpContextContract) { }
  //GET :id/edit
  public async edit({ }: HttpContextContract) { }
  //PUT|PATCH :id
  public async update({ }: HttpContextContract) { }
  //Delete :id
  public async destroy({ params, session, response, request }: HttpContextContract) {
    request.param('id')
    const deletedRowsCount = await Database
      .from('books')
      .where('id', params.id)
      .delete()
    session.flash('alert', 'Book deleted successfully')
    await deletedRowsCount
    return response.redirect('/admin')
  }
}
