import { DoctorSpeciality } from './DoctorSpecialityInterface';

export interface Doctor {
  id:number;
  nom:string;
  prenom:string;
  adresse:string;
  longitude:number;
  latitude:number;
  specialiteId: number;
  specialite:DoctorSpeciality;
  services:Array<string>;
  distance:number;
}