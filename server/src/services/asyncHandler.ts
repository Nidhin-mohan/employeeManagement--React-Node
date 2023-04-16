import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err: any) {
    console.log(err);
    res.status((err as any).code || 500).json({
      success: false,
      message: (err as any).message,
    });
  }
};

export default asyncHandler;
