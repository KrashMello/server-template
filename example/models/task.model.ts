import { Model } from '@Model/index'
import { type Response } from 'express'

export class TaskModel extends Model {
  schemaName = 'task'
  tableName = 'tasks'
  constructor() {
    super()
    this.initBD()
  }

  find(data: { code: string, name: string, description: string }, resp: Response): any {
    const { code, name, description } = data
    return this.DB.view("*", `"allTasks"`).where([
      `"code"::text like '%${code}%'`,
      `"name" like '%${name}%'`,
      `"description" like '%${description}%'`
    ]).exec().then((res: any) => {
      return resp.status(200).json(res.rows)
    }).catch((error: any) => {
      console.log(error)
      return resp.status(401).json({ message: "ah ocurrido un error" })
    })
  }

  create(data: { name: string, description: string }, resp: Response): any {
    this.DB.call('createtask', `'${data.name}'::varchar, '${data.description}'::text`).exec().then((_res: any) => {
      return resp.status(200).json({ message: "tarea creada" })
    }).catch((error: any) => {
      console.log(error)
      return resp.status(401).json({ message: "ah ocurrido un error!" })
    })
  }

  update(data: { name: string, description: string, code: string }, resp: Response): any {
    this.DB.call('updatetask', `'${data.code}'::uuid, '${data.name}'::varchar, '${data.description}'::text`).exec().then((_res: any) => {
      return resp.status(200).json({ message: "tarea actualizada" })
    }).catch((error: any) => {
      console.log(error)
      return resp.status(401).json({ message: "ah ocurrido un error!" })
    })
  }

  delete(data: { code: string }, resp: Response): any {
    this.DB.call('deletetask', `'${data.code}'::uuid`).exec().then((_res: any) => {
      return resp.status(200).json({ message: "tarea eliminada" })
    }).catch((error: any) => {
      console.log(error)
      return resp.status(401).json({ message: "ah ocurrido un error!" })
    })
  }
}