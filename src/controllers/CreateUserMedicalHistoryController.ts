import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserMedicalHistoryService } from "../services/CreateUserMedicalHistoryService";

class CreateUserMedicalHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {    
    const { user_id } = request.params;
    const { height, weight, pregnant, illnesses } = request.body;

    const createUserMedicalHistoryService = container.resolve(CreateUserMedicalHistoryService)
    
    const user = await createUserMedicalHistoryService.execute({
      user_id, height, weight, pregnant, illnesses
    });

    return response.status(201).json(user);
  }
}

export { CreateUserMedicalHistoryController };
