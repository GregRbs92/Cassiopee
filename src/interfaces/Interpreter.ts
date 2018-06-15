export interface Interpreter {
  id:number,
  nom:string,
  prenom:string,
  email: string,
  adresse:string,
  code_postal: string,
  ville: string,
  telephone: string,
  longitude:number,
  latitude:number,
  description: string,
  langues: string[],
  distance:number
}