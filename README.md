# CandV ('kand-ve)
## What is this?
A simple copy and paste (ctrl+c, ctrl+v) application and database that is configured for Red Hat's OpenShift.

## How can I run my own candv app?
This app is configured to be deployed and managed via OpenShift.  Which means all you'll need to do is click a few buttons and specify some settings.
* If you are using OpenShift Online, [follow instructions here][1]
* If you have OpenShift Enterprise, [follow instructions here][2] 

### How is this deployment/devops magic happening?
> The app is getting built into a docker image with a tool called Source 2 Image.
> You can read [about it here][3].  And [even more here][5].

### More about the deployment settings (aka template parameters)
The app has a been pre-configured with a template to be an Instant app for OpenShift.  It will start a database, webapp, and any other dependencies with a default configuration.  There are parameters specified in the template that let you set some specific values for the following items:
* TBD
* TBD
* TBD
* TBD

[Click here if you want to read about making your own instant apps][8].

## Notes on using CandV
TBD.

## Notes on the CandV architecture
TBD.

## Notes on the CandV REST interface
TBD.

## Common Problems and Debugging Help
TBD.
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
[2]: https://docs.openshift.com/enterprise/3.1/welcome/index.html
[3]: https://docs.openshift.org/latest/using_images/s2i_images/nodejs.html
[4]: https://github.com/dudash/candv/issues
[5]: https://docs.openshift.com/enterprise/3.1/architecture/core_concepts/builds_and_image_streams.html
[6]: https://github.com/openshift/origin/blob/master/docs/debugging-openshift.md
[7]: https://opensource.org/licenses/MIT
[8]: https://docs.openshift.com/enterprise/3.1/install_config/install/first_steps.html#creating-instantapp-templates