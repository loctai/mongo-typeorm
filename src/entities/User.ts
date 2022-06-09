import { Entity, ObjectIdColumn, Column, CreateDateColumn, ObjectID } from "typeorm";
import { UserMedicalHistory } from "./UserMedicalHistory";

@Entity()
class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birthdate: Date

  @Column()
  gender: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  medicalHistory: UserMedicalHistory
}

export { User }
