# simple_node_server

## The user can access both public routes (/api and /rules), but will only be able to access /secret if he logs in (/login)

## Currently login is only a mock user.

## To login, post request to /login, copy the json web token and add it (format: Bearer <token>) to your post request to /secret.
