import { Service, Signal, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable, catchError, of, retry } from 'rxjs';
import { BREWERY_CONFIG } from '../shared/brewery-config';
import { Brewery } from '../shared/models/brewery';

@Service()
export class BreweryApiService {
  private http = inject(HttpClient);
  private config = inject(BREWERY_CONFIG);
  private url = `${this.config.apiBaseUrl}/breweries`;

  // HttpClient: returns cold Observables

  search(query: string, perPage = 20): Observable<Brewery[]> {
    return this.http.get<Brewery[]>(`${this.url}/search`, {
      params: { query, per_page: perPage },
    });
  }

  getById(id: string): Observable<Brewery | null> {
    return this.http.get<Brewery>(`${this.url}/${id}`).pipe(
      retry(2),
      catchError(() => of(null)),
    );
  }

  //  httpResource factories: call from a field initializer ----

  byCity(city: Signal<string>) {
    return httpResource<Brewery[]>(() => {
      const value = city().trim();
      return value
        ? { url: this.url, params: { by_city: value, per_page: 30 } }
        : undefined;
    }, { defaultValue: [] });
  }

  byType(type: Signal<string>) {
    return httpResource<Brewery[]>(() => ({
      url: this.url,
      params: { by_type: type(), per_page: 20 },
    }), { defaultValue: [] });
  }

  byId(id: Signal<string>) {
    return httpResource<Brewery>(() => `${this.url}/${id()}`);
  }

  byIds(ids: Signal<string[]>) {
    return httpResource<Brewery[]>(() => ids().length
      ? { url: this.url, params: { by_ids: ids().join(',') } }
      : undefined,
    { defaultValue: [] });
  }
}
