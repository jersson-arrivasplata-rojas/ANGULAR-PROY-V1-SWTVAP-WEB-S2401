import { DistrictInterface } from "./district.interface";

export interface ProvinceInterface {
    id: number,
    name: string,
    districts: DistrictInterface[]
}
