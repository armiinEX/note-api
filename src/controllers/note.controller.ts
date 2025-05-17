import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';

export class NoteController {

  static async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);

    if (
      (req.query.page && (isNaN(page) || page < 1)) ||
      (req.query.limit && (isNaN(limit) || limit < 1))
    ) {
      return res.status(400).json({
        message: 'Invalid query parameters. "page" and "limit" must be positive integers.',
      });
    }

    const finalPage = isNaN(page) ? 1 : page;
    const finalLimit = isNaN(limit) ? 10 : limit;

    const result = await NoteService.getAll(finalPage, finalLimit);
    return res.json(result);
  }


  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id < 1 || !Number.isInteger(id)) {
      return res.status(400).json({ message: 'Invalid note ID. ID must be a positive integer.' });
    }

    const note = await NoteService.getOne(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.json(note);
  }


  static async create(req: Request, res: Response) {
    const { title, content } = req.body;

    if (
      typeof title !== 'string' || typeof content !== 'string' ||
      !title.trim() || !content.trim() ||
      title.trim().length < 3 || content.trim().length < 3
    ) {
      return res.status(400).json({
        message: 'Title and content are required and must be at least 3 characters long.',
      });
    }

    const newNote = await NoteService.create({
      title: title.trim(),
      content: content.trim(),
    });

    return res.status(201).json(newNote);
  }


  static async bulkCreate(req: Request, res: Response) {
    const notes = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({ message: 'Notes array is required and cannot be empty' });
    }

    const invalidNote = notes.find(note =>
      typeof note.title !== 'string' ||
      typeof note.content !== 'string' ||
      !note.title.trim() || note.title.trim().length < 3 ||
      !note.content.trim() || note.content.trim().length < 3
    );

    if (invalidNote) {
      return res.status(400).json({
        message: 'Each note must have a valid title and content (minimum 3 characters).',
      });
    }

    try {
      const cleanedNotes = notes.map(note => ({
        title: note.title.trim(),
        content: note.content.trim(),
      }));

      const createdNotes = await NoteService.bulkCreate(cleanedNotes);
      return res.status(201).json({
        message: `${createdNotes.length} notes created successfully`,
        notes: createdNotes,
      });
    } catch (error) {
      console.error('Bulk create failed:', error);
      return res.status(500).json({ message: 'Failed to create notes' });
    }
  }


  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    if (
      typeof title !== 'string' || typeof content !== 'string' ||
      !title.trim() || title.trim().length < 3 ||
      !content.trim() || content.trim().length < 3
    ) {
      return res.status(400).json({
        message: 'Title and content are required and must be at least 3 characters long.',
      });
    }

    const updated = await NoteService.update(id, {
      title: title.trim(),
      content: content.trim(),
    });

    if (!updated) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.json(updated);
  }


  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const deleted = await NoteService.delete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(204).send();
  }

}
