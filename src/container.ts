import { container } from "tsyringe";

import { UserRepository } from "./repositories/UserRepository";
import { UserMedicalHistoryRepository } from "./repositories/UserMedicalHistoryRepository";
import { IUserRepository } from "./repositories/IUserRepository";
import { IUserMedicalHistoryRepository } from "./repositories/IUserMedicalHistoryRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IUserMedicalHistoryRepository>(
  "UserMedicalHistoryRepository",
  UserMedicalHistoryRepository
);