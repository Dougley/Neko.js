# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.5"

Vagrant.configure("2") do |config|

  config.vm.hostname = "nekobot"

  config.vm.box = "scotch/box"

  config.vm.network :private_network, ip: "192.168.33.20"
  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |v|
    v.name = "nekobot"
  end

  config.vm.provision :shell, path: "provisioner.sh", args: ["nekobot"]

  config.vm.synced_folder "./", "/var/www/public", :mount_options => ["dmode=777", "fmode=666"]

end
