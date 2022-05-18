import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import Category from 'App/Models/Category'
import Book from 'App/Models/Book'
export default class BooksController {
  public async index({ view }: HttpContextContract) {
    const books = await Book.query()
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

    // const postData = await request.validate({
    //   schema: schema.create({
    //     book_image: schema.file({
    //       size: '2mb',
    //       extnames: ['gif', 'png', 'jpg']
    //     }),
    //   }),
    // })

    // await postData.book_image.move(Application.tmpPath('banner-uploaded !'))

    // return response.created({
    //   message: 'File uploaded.'
    // })

      const postSchema = schema.create({
        book_image: schema.file({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    })

    const payload = await request.validate({ schema: postSchema })
    await payload.book_image.move(Application.tmpPath('uploads'))

    // const image = request.file('book_image')
    // if(!image) {
    //   return 'Please upload file'
    // }
    // await image.move(Application.tmpPath('images'))

    const addBook = new Book()
    addBook.title = request.input('title')
    addBook.author = request.input('author')
    addBook.publisher = request.input('publisher')
    addBook.book_catn = request.input('book_catn')
    addBook.book_image = request.input('book_image')

    const files = request.allFiles()
    console.log(files)

    await addBook.save()

    session.flash('alert', 'Book Successfully added.')
    response.redirect('/')
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
