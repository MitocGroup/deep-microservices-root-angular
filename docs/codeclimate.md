How to use codeclimate/tslint on localhost
========================

**Skip this steps if you won't install Codeclimate CLI**

### How to install Codeclimate CLI on Linux:
- [ ] `sudo apt-get update`
- [ ] `sudo apt-get install docker-ce`
- [ ] `sudo docker run hello-world` (checking if docker works, optionally)
- [ ] `sudo docker pull codeclimate/codeclimate`
- [ ] `sudo docker run   --interactive --tty --rm --env CODECLIMATE_CODE="$PWD" --volume "$PWD":/code --volume /var/run/docker.sock:/var/run/docker.sock --volume /tmp/cc:/tmp/cc codeclimate/codeclimate help`
- [ ] Go to some parent folder that wont touch git repository.
- [ ] `curl -L https://github.com/codeclimate/codeclimate/archive/master.tar.gz | tar xvz
 2097  cd codeclimate-* && sudo make install`
- [ ] `sudo codeclimate engines:enable tslint`

### How to use Codeclimate CLI:
- [ ] Move into path with `.codeclimate.yml`
- [ ] `sudo codeclimate analyze [path]`, if you want to run only **tslint** add at the end `-e tslint:beta`
