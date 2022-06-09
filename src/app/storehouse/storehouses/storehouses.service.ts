import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shelf } from './shelfs/Shelf';
import { Storehouse } from './Storehouse';

@Injectable({
  providedIn: 'root'
})
export class StorehousesService {

  private urlStorehouseCreate = 'http://localhost:8080/storehouse/create'
  private urlStorehouseDelete = 'http://localhost:8080/storehouse/delete/'
  private urlStorehousesGetAll = 'http://localhost:8080/storehouse/all';
  private urlStorehouseGetById = 'http://localhost:8080/storehouse/';
  private urlStorehouseUpdate = 'http://localhost:8080/storehouse/update';
  private urlShelfByIdentifier = 'http://localhost:8080/shelf/find/';
  private urlShelfUpdate = 'http://localhost:8080/shelf/update'
  private urlShelvesByStorehouseId = 'http://localhost:8080/storehouse/shelves/';
  private urlGetAllShelves = 'http://localhost:8080/shelf/all';
  private urlDeleteShelf = 'http://localhost:8080/shelf/delete/';

constructor(private http: HttpClient) { }

getStorehouses(){
  return this.http.get<Storehouse[]>(this.urlStorehousesGetAll);
}

getShelf(identifier: string){
  return this.http.get<Shelf>(this.urlShelfByIdentifier.concat(identifier));
}

getStorehouse(id: string){
  return this.http.get<Storehouse>(this.urlStorehouseGetById.concat(id));
}

getShelves(id: string){
  return this.http.get<Shelf[]>(this.urlShelvesByStorehouseId.concat(id));
}

putShelf(shelf: Shelf){
  return this.http.put<Shelf>(this.urlShelfUpdate, shelf);
}

putStorehouse(storehouse: Storehouse){
  return this.http.put<Storehouse>(this.urlStorehouseUpdate, storehouse);
}

postStorehouse(storehouse: Storehouse){
  return this.http.post<Storehouse>(this.urlStorehouseCreate, storehouse);
}

deleteStorehouse(id: string){
  return this.http.delete(this.urlStorehouseDelete.concat(id));
}

getAllShelves(){
  return this.http.get<Shelf[]>(this.urlGetAllShelves);
}

deleteShelf(id: string){
  return this.http.delete(this.urlDeleteShelf.concat(id));
}
}
