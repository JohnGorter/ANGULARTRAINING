### Posting data

* Resembles GET

```ts
private save(person: Person): Observable<Person> {
    let headers = new HttpHeaders({
        'Auth-Token': 'my-auth-token'
    });

    return this.http
        .post<Person>('api/people', person, { headers: headers })
        .pipe(catchError(this.handleError))
        .subscribe(res => res.data);
}
```