# CandV Developer Notes
Notes for developers extending or fixing bugs in this project.

## Doing Releases
When releasing we are going to put the node_modules into the branch before tagging.  The process is simple (although I could script it later):
In the master branch
1) npm shrinkwrap
2) update .gitignore to comment out the node_modules line
3) git commit and push
4) tag the release in github
5) Update .gitignore to add back the node_modules line
6) git commit and push the master

This will get a new shrinkwrap along with the node_modules into the release branch but it won't force them to linger in the master.

Thanks for reading!
- Dudash

