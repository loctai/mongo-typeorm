import { Entity, Column, CreateDateColumn, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
class UserMedicalHistory {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  user_id: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  pregnant: boolean;

  @Column()
  illnesses: string[];

  @CreateDateColumn()
  created_at: Date;
}

export { UserMedicalHistory };