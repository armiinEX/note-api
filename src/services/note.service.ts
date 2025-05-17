import { sequelize } from '../config/database'
import { Note } from '../models/note.model';

export class NoteService {

  static async getAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Note.findAndCountAll({ limit, offset });

    return { notes: rows, total: count };
  }

  static async getOne(id: number) {
    return await Note.findByPk(id);
  }

  static async create(data: { title: string; content: string }) {
    return await Note.create(data);
  }

  static async bulkCreate(notes: { title: string; content: string }[]) {
    return await sequelize.transaction(async (t) => {
      return await Note.bulkCreate(notes, { transaction: t });
    });
  }

  static async update(id: number, data: { title: string; content: string }) {
    const note = await Note.findByPk(id);
    if (!note) return null;

    return await note.update(data);
  }

  static async delete(id: number) {
    const note = await Note.findByPk(id);
    if (!note) return false;
    await note.destroy();

    return true;
  }
}
