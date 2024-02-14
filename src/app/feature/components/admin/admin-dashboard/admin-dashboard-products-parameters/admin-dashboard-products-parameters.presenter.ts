import { Injectable } from "@angular/core";
import { ParametersEnum } from "src/app/shared/config/parameters.enum";

@Injectable()
export class AdminDashboardProductsParametersPresenter {


  getAllSelectedParameters(parameters) {
    const select =  parameters.filter((parameter) => parameter.code === ParametersEnum.SELECT).at(0);
    const response = parameters.filter((parameter) => parameter.parentId === select.id);

    return response;
  }
}
