import { Shelf } from "./shelfs/Shelf";

export interface Storehouse {
    id?: number;
    description: string;
    shelves?: Shelf[];
}
