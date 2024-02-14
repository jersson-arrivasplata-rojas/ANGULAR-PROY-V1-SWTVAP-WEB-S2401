import { Injectable } from "@angular/core";
import { ParametersEnum } from "src/app/shared/config/parameters.enum";

@Injectable()
export class AdminDashboardProductsParametersPresenter {

  parameters: any[] = [];

  getAllSelectedParameters(parameters) {
    return parameters
      .filter(parameter => parameter.code === ParametersEnum.SELECT)
      .map(select => {
        const details = parameters.filter(parameter => parameter.parentId === select.id);
        return {
          ...select,
          details: details.map(detail => ({
            ...detail,
            details: parameters.filter(parameter => parameter.parentId === detail.id)
          }))
        };
      });
  }

}
