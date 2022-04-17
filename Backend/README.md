## Backend

Requires MongoDB, Node.js, Express

### Requests 
Base URL : `/api/v1/`

| Endpoint       | Request      | Body                                 | Header     | Param | Response                                  |
|----------------|--------------|--------------------------------------|------------|-------|-------------------------------------------|
| /authenticate/ | POST /Signup | name,email,password                  | None       | None  | Status, token                             |
| /authenticate  | POST /login  | email, password                      | None       | None  | status,token                              |
| /review        | POST /       | name, review                         | SpecialKey | None  | response                                  |
| /review        | GET /        | None                                 | None       | None  | All the Reviews                           |
| /weather       | Get /        | city                                 | None       | None  | city,country,temperature,region,condition |
| /farmer        | POST /crop   | name, description, details, location | token      | None  | Response from API                         |
| /farmer        | GET /crop    | none                                 | token      | None  | All the crops of the farmer               |
| /farmer        | PUT /crop    | same as farmer                       | token      | None  | Response Status From api                  |


/farmer JSON Object to pass to the api

```json
"name": "",
"description": "",
"details": {
      "howOld": "",
      "estimatedTime": ""
      },
"location": {
      "city": "",
      "state": "",
      "district": "",
}
```
