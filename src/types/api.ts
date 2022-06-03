import { NextFunction, Request, Response } from 'express';

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type ControllerMap = {
  get?: Controller;
  getOne?: Controller;
  post?: Controller;
  patch?: Controller;
  patchOne?: Controller;
  delete?: Controller;
  deleteOne?: Controller;
};
