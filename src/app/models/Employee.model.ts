import {Month} from "./Month.model";
import {ConstructionSiteDto} from "./ConstructionSite.model";

export interface Employee{
  employerId:string;
  name: string;
  lastName:string;
  homeAddress:string;
  salary:string;
  phone:string;
  months: Month[] ;
  constructionSiteDto:ConstructionSiteDto | null;
}
