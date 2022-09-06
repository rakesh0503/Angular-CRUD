import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  api = 'http://localhost:3000/employee'
  postEmployee(data: any) {
    return this.http.post<any>(`${this.api}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getEmployee() {
    return this.http.get<any>(`${this.api}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  updateEmployee(data: any, id: number) {
    return this.http.put<any>(`${this.api}/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(`${this.api}/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
