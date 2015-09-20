# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.5"

def which(cmd)
  exts = ENV['PATHEXT'] ? ENV['PATHEXT'].split(';') : ['']
  ENV['PATH'].split(File::PATH_SEPARATOR).each do |path|
    exts.each { |ext|
      exe = File.join(path, "#{cmd}#{ext}")
      return exe if File.executable? exe
    }
  end
  return nil
end

Vagrant.configure("2") do |config|

  config.vm.hostname = "NekoBot"

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "https://vagrantcloud.com/ubuntu/boxes/trusty64/versions/14.04/providers/virtualbox.box"

  config.vm.network :private_network, ip: "192.168.33.20"
  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |v|
    v.name = "nekobot"
    v.customize [
      "modifyvm", :id,
      "--name", "nekobot",
      "--ostype", "Ubuntu_64",
      "--memory", 512,
      "--natdnshostresolver1", "on",
      "--natdnsproxy1", "on",
      "--cpus", 1,
    ]
  end

  if which('ansible-playbook')
    config.vm.provision "ansible" do |ansible|
      ansible.playbook = "ansible/playbook.yml"
      ansible.inventory_path = "ansible/hosts"
      ansible.limit = 'all'
    end
  else
    config.vm.provision :shell, path: "ansible/windows.sh", args: ["nekobot"]
  end

  config.vm.synced_folder "./", "/vagrant"
end
