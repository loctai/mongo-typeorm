import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUserService } from "../services/FindUserService";

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.params;

    const findUserService = container.resolve(FindUserService)

    const user = await findUserService.execute(email);

    return response.json(user);
  }
}

export { FindUserController };
