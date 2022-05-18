import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index({ view }: HttpContextContract) {
    const categories = await Category.all()
    return view.render('site/categories', {
      categories
    })
  }
  public async create({ }: HttpContextContract) { }

  public async store({ request, response, session}: HttpContextContract) { 

    const addCategory= new Category()
    addCategory.cat_name = request.input('cat_name')
    addCategory.cat_image = request.input('cat_image')

    const coverImage = request.file('cat_image')

    if (coverImage) {
      await coverImage.move(Application.tmpPath('../public/img/categoriesImages'))
    }


    const files = request.allFiles()
    console.log(files)
    session.flash('alert', 'Category Successfully added.')
    return response.redirect().back()
  }

  public async show({ }: HttpContextContract) { }

  public async edit({ }: HttpContextContract) { }

  public async update({ }: HttpContextContract) { }

  public async destroy({ }: HttpContextContract) { }
}
