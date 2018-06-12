import { InterpreterSpeciality } from './InterpreterSpecialityInterface';

export interface Interpreter {
  id:number;
  nom:string;
  prenom:string;
  adresse:string;
  longitude:number;
  latitude:number;
  specialiteId: number;
  specialite:InterpreterSpeciality;
  services:Array<string>;
  distance:number;
}