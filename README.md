[![Stories in Ready](https://badge.waffle.io/dudash/candv.png?label=ready&title=Ready)](https://waffle.io/dudash/candv)

# CandV ('kand-ve)
## What is this?
A simple copy and paste (ctrl+c, ctrl+v) application and database that is configured for Red Hat's OpenShift.

![Screenshot CandV](./.screens/2016-06-30_1911.png?raw=true)

## How can I run my own candv app?
This app is configured to be deployed and managed via OpenShift.  Which means all you'll need to do is: point Open Shift to the source code, tell it you want a mongo database, and then set any variables you want to customize for your environment.

Here's how from the Open Shift [command line tool][10]:
 > `oc new-project candvdemo`
 > `oc new-app https://github.com/dudash/candv`
 > `oc process openshift/mongodb-ephemeral`
 > `oc expose service candv`
 
#### -OR- You can run this as an Instant App (aka templates)
There is also template for this to be an Instant app for OpenShift.  It contains the definitions of resources and configuration parameters that OpenShift can use to create everything you need to run.  This makes things even more automated.  Try this by typing this into the command line (after logging into an OpenShift server):
 > `oc new-app -f https://raw.githubusercontent.com/dudash/candv/master/oc_templates/candv_instant_template.yaml`
 
 Or if you are an Open Shift administrator you can install the template for users to create with the web console.

[Click here if you want to read about making your own instant apps for OpenShift][8].

What is now running and being managed by OpenShift looks like the diagram below.


## CandV architecture diagrams
* TBD Conceptual Arch - webapp node.js serverside, webapp client side java script, database
* TBD Deployment Arch - openshift containers, pods, services, routes


## How is this deployment/devops magic happening?
`oc new-app` is creating a bunch of configuration metadata for the app.  Then the app is getting built into a container image with a tool called Source 2 Image (s2i).  You can read [about S2I here][3].  And [even more here][5].  The container then gets pushed to a container registry so that it's accessible to all nodes in the cluster.  And then an instance of the container is getting deployed (pulled and run) in the cluster.  Kubernetes does the orchestrating of container placement in the best fit of your cluster and then keeps watching it to keep it running.  A route configuration is allowing external traffic into the container and a service layer is acting as an internal load balancer to get traffic to the correct container.

#### Read more about OpenShift and getting started here:
* Learning OpenShift, [try it out here][1]
* OpenShift Container Platform, [documentation here][2] 


## Notes on using CandV
The webapp is mostly obvious in terms of user interaction.  Click in the box and paste your data, then press enter or click the 'Add' button to insert into the global clipboard list.  You can retrieve previously entered data from the list by clicking the copy icon located to the right of the data.  Currently delete is not supported.


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


[1]: https://learn.openshift.com/
[2]: https://docs.openshift.com/
[3]: https://docs.openshift.com/container-platform/3.7/using_images/s2i_images/nodejs.html
[4]: https://github.com/dudash/candv/issues
[5]: https://docs.openshift.com/container-platform/3.7/architecture/core_concepts/builds_and_image_streams.html
[6]: https://github.com/openshift/origin/blob/master/docs/debugging-openshift.md
[7]: https://opensource.org/licenses/MIT
[8]: https://docs.openshift.com/container-platform/3.7/dev_guide/templates.html#using-the-instantapp-templates
[9]: https://github.com/OAI/OpenAPI-Specification
[10]: https://docs.openshift.com/container-platform/3.7/cli_reference/get_started_cli.html
