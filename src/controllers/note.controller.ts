import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';

export class NoteController {

  static async getAll(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await NoteService.getAll(page, limit);

    res.json(result);
  }

  static async getOne(req: Request, res: Response) {
    const note = await NoteService.getOne(+req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.json(note);
  }

  static async create(req: Request, res: Response) {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: 'Title and content cannot be empty' });
    }
    const newNote = await NoteService.create({ title, content });

    res.status(201).json(newNote);
  }

  static async bulkCreate(req: Request, res: Response) {
    const notes = req.body;

    if (!Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({ message: 'Notes array is required' });
    }

    const invalid = notes.find(note => !note.title?.trim() || !note.content?.trim());
    if (invalid) {
      return res.status(400).json({ message: 'Each note must have a non-empty title and content' });
    }

    try {
      const createdNotes = await NoteService.bulkCreate(notes);
      res.status(201).json({ message: `${createdNotes.length} notes created successfully`, notes: createdNotes });
    } catch (error) {
      console.error('Bulk create failed:', error);
      res.status(500).json({ message: 'Failed to create notes' });
    }
  }

  static async update(req: Request, res: Response) {
    const { title, content } = req.body;
    const updated = await NoteService.update(+req.params.id, req.body);

    if (!updated) return res.status(404).json({ message: 'Note not found' });

    if (!title?.trim() || !content?.trim()) {
      return res.status(400).json({ message: 'Title and content cannot be empty' });
    }

    res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const deleted = await NoteService.delete(+req.params.id);

    if (!deleted) return res.status(404).json({ message: 'Note not found' });

    res.status(204).send();
  }
}
