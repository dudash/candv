[![Stories in Ready](https://badge.waffle.io/dudash/candv.png?label=ready&title=Ready)](https://waffle.io/dudash/candv)

# CandV ('kand-ve)
## What is this?
A simple copy and paste (ctrl+c, ctrl+v) application and database that is configured for Red Hat's OpenShift.

![Screenshot CandV](./.screens/2016-03-23_1835.png?raw=true)

## How can I run my own candv app?
This app is configured to be deployed and managed via OpenShift.  Which means all you'll need to do is: point Open Shift to the source code, tell it you want a mongo database, and then set any variables you want to customize for your environment.

Here's how from the Open Shift [command line tool][10]:
 > oc new-app https://github.com/dudash/candv mongodb-ephemeral ; oc expose service candv
 
 > oc env --list dc/mongodb | grep MONGO | oc env dc/candv -e -
 
 
### Read more about OpenShift and getting started here:
* If you are using OpenShift Online, [follow instructions here][1]
* If you have OpenShift Enterprise, [follow instructions here][2] 

### How is this deployment/devops magic happening?
> The app is getting built into a docker image with a tool called Source 2 Image (s2i).
> You can read [about it here][3].  And [even more here][5].

### Run as an Instant App (aka templates)
I'm also writing a template for this to be an Instant app for OpenShift (in progress).  It will contain the definitions of resources and configuration parameters that OpenShift can use to create everything you need to run.  To make things even more automated.
[Click here if you want to read about making your own instant apps for OpenShift][8].

## Notes on using CandV
The webapp is mostly obvious in terms of user interaction.  Click in the box and paste your data, then press enter or click the 'Add' button to insert into the global clipboard list.  You can retrieve previously entered data from the list by clicking the copy icon located to the right of the data.  Currently delete is not supported.

## Notes on the CandV architecture
TBD Conceptual Arch - webapp node.js serverside, webapp client side java script, database
TBD Deployment Arch - openshift containers, pods, services, routes

## Notes on the CandV REST interface
The REST interface and corresponding [OpenAPI spec][9] is in-progress, so the write-up is TBD.

## Common Problems and Debugging Help	
Currently there are no common problems - if you have some please submit [issues][4].
> Here are some tips on [debugging openshift origin][6].


## Future Features + Bugs + Etc...
Everything is tracked in the [github issue tracker][4].

Please write up bugs with as much detail as possible and include:
1. Details on what happened
2. How to reproduce it
3. Anything unqiue about your deployment environment

## License
Under the terms of the [MIT][7].


[1]: https://developers.openshift.com/en/getting-started-overview.html
[2]: https://docs.openshift.com/enterprise/latest/welcome/index.html
[3]: https://docs.openshift.org/latest/using_images/s2i_images/nodejs.html
[4]: https://github.com/dudash/candv/issues
[5]: https://docs.openshift.com/enterprise/latest/architecture/core_concepts/builds_and_image_streams.html
[6]: https://github.com/openshift/origin/blob/master/docs/debugging-openshift.md
[7]: https://opensource.org/licenses/MIT
[8]: https://docs.openshift.com/enterprise/latest/install_config/install/first_steps.html#creating-instantapp-templates
[9]: https://github.com/OAI/OpenAPI-Specification
[10]: https://docs.openshift.com/enterprise/latest/cli_reference/get_started_cli.html
