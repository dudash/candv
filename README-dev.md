# CandV Developer Notes
Notes for developers extending or fixing bugs in this project.

## Important Environment Variables || DEFAULT VALUE
* MONGODB_USER || 'dummy'
* MONGODB_PASSWORD || 'dummy'
* MONGODB_SERVICE_HOST || 'localhost'
* MONGODB_SERVICE_PORT || 27017
* MONGODB_DATABASE || 'cvDevel'
* MONGODB_USEAUTH || 'true'

## Doing Releases
When releasing we are going to put the node_modules into the branch before tagging.  The process is simple (although I could script it later):
In the master branch
1) npm shrinkwrap
2) update .gitignore to comment out the node_modules line
3) git commit and push
4) tag the release in github with 'v#.#.#'
5) Update .gitignore to add back the node_modules line
6) delete the node_modules folder
7) git commit and push the master

This will get a new shrinkwrap along with the node_modules into the release branch but it won't force them to linger in the master.

Thanks for reading!
- Dudash

