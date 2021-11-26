import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Movie from '../models/Movie';
import moviesView from '../views/movies_view';

export default {
  async getAll(request: Request, response: Response) {
    const moviesRepository = getRepository(Movie);

    const movies = await moviesRepository.find({ relations: ['review'] });

    return response.json(moviesView.renderMany(movies));
  },
};
