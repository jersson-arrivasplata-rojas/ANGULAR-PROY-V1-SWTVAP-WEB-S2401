export interface ParameterInterface {
  code: string;
  deletedAt: null | string; // Asumiendo que puede ser una fecha en formato string o nulo
  description: string;
  groupId: null | number; // Cambia a 'number' o el tipo correspondiente si groupId puede tomar otros valores
  id: number;
  parentId: null | number; // Asumiendo que puede ser un número o nulo
  position: null | number; // Cambia a 'number' o el tipo correspondiente si position puede tomar otros valores
  status: string;
  value: string;
  value1: null | string; // Cambia a 'string' o el tipo correspondiente si value1 puede tomar otros valores
  value2: null | string; // Cambia a 'string' o el tipo correspondiente si value2 puede tomar otros valores
  children?: ParameterInterface[]; // Opcional, puede o no estar presente
}
