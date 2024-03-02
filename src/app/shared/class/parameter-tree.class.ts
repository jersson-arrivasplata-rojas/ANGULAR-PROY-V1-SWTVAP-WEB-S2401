
export class ParameterTree {
  constructor(private parameters: any[]) { }

  buildTree(): any[] {
    const parameterMap = new Map<number, any>();
    const rootParameters: any[] = [];

    // Construir un mapa de comentarios usando parameterId como clave
    this.parameters.forEach(parameter => {
      parameterMap.set(parameter.id, parameter);
    });

    // Organizar los comentarios en una estructura de \u00E1rbol
    this.parameters.forEach(parameter => {
      if (parameter.parentId !== null) {
        const parentParameter = parameterMap.get(parameter.parentId);
        if (parentParameter) {
          if (!parentParameter.children) {
            parentParameter.children = [];
          }
          parentParameter.children.push(parameter);
        }
      } else {
        rootParameters.push(parameter);
      }
    });

    return rootParameters;
  }

  public getArrayOfStructure() {
    return this.parameters.map(item => {
      delete item.children;
      return this.getNewItem(item);
    });
  }

  public hasDeletedParent(parameter: any): string {
    while (parameter.parentId !== null) {
      const parentParameter = this.parameters.find(p => p.id === parameter.parentId);
      if (parentParameter) {
        if (parentParameter.deletedAt) {
          return parentParameter.deletedAt;
        }
        parameter = parentParameter;
      } else {
        break;
      }
    }
    return '';
  }

  public hasDeletedChild(parameter: any): boolean {
    if (parameter.deletedAt) {
      return true;
    }
    if (parameter.children) {
      for (let child of parameter.children) {
        if (this.hasDeletedChild(child)) {
          return true;
        }
      }
    }
    return false;
  }

  public getNewItem(item: any) {
    const data = {
      id: item.id,
      deletedAt: item.deletedAt,
      code: item.code,
      description: item.description,
      groupId: item.groupId,
      parentId: item.parentId,
      position: item.position,
      status: item.status,
      value: item.value
    };
    return data;
  }
}
