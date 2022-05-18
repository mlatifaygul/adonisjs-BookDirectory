import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'
import Book from 'App/Models/Book'
export default class BooksController {
  public async index({ view, request }: HttpContextContract) {

    const limit = 15
    const page = request.input('page', 1)

    const books = await Book.query().from('books')
    .select('*').orderBy('id', 'asc').paginate(page, limit)
    books.baseUrl('/')
    return view.render('site/home', {
      books
    })
  }

  public async create({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('site/admin/add_book', {
      categories
    })
  }

  public async store({ request, response, session }: HttpContextContract) {

    const addBook = new Book()
    addBook.title = request.input('title')
    addBook.author = request.input('author')
    addBook.publisher = request.input('publisher')
    addBook.book_catn = request.input('book_catn')
    addBook.book_image = request.input('book_image')

    const coverImage = request.file('book_image')

    if (coverImage) {
      await coverImage.move(Application.tmpPath('../public/img/bookImages'))
    }


    const files = request.allFiles()
    console.log(files)
    session.flash('alert', 'Book Successfully added.')
    return response.redirect('/')
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
