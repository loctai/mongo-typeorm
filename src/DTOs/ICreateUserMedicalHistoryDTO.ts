
interface ICreateUserMedicalHistoryDTO {
  user_id?: string;
  height: number;
  weight: number;
  pregnant: boolean;
  illnesses: string[];
}

export { ICreateUserMedicalHistoryDTO };
