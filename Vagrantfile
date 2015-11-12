# -*- mode: ruby -*-
# vi: set ft=ruby :

boxes = [
  { :name => :redis,             :ip => '192.168.33.10', :ssh_port => 2202, :cpus => 1, :mem => 1024, :mac => "720002691321", :puppet => "redis.pp"    },
  # { :name => :mongodb,           :ip => '192.168.33.12', :ssh_port => 2204, :cpus => 1, :mem => 1024, :mac => "720002691343", :puppet => "mongodb.pp"  },
  # { :name => :rabbitmq,          :ip => '192.168.33.13', :ssh_port => 2205, :cpus => 1, :mem => 1024, :mac => "720002691354", :puppet => "rabbitmq.pp" },
  { :name => :service,           :ip => '192.168.33.11', :ssh_port => 2203, :cpus => 1, :mem => 1024, :mac => "720002691332", :puppet => "nodejs.pp"   },
  # { :name => :worker,            :ip => '192.168.33.14', :ssh_port => 2206, :cpus => 1, :mem => 1024, :mac => "720002691365", :puppet => "nodejs.pp"   },
]

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    boxes.each do |opts|

        config.vm.define opts[:name] do |config|

            # originally used to get redis working with the following.
            config.vm.box = "ubuntu/trusty64"

            # missing - config.vm.box_url
            config.vm.network "private_network", ip: opts[:ip], guest: 22, host: opts[:ssh_port], netmask: "255.255.255.0"
            config.vm.hostname = "%s" % opts[:name].to_s

            config.vm.provider "virtualbox" do |vb|
                vb.customize ["modifyvm", :id, "--cpus", opts[:cpus] ] if opts[:cpus]
                vb.customize ["modifyvm", :id, "--memory", opts[:mem] ] if opts[:mem]
            end

            config.vm.provision "puppet" do |puppet|
                puppet.options = "--verbose --debug"
                puppet.manifest_file = "%s" % opts[:puppet].to_s
                puppet.manifests_path = "puppet/manifests"
                puppet.module_path = "puppet/modules"
            end

            # Share an additional folder to the guest VM. The first argument is
            # the path on the host to the actual folder. The second argument is
            # the path on the guest to mount the folder. And the optional third
            # argument is a set of non-required options.
            # config.vm.synced_folder "../data", "/vagrant_data"

            # config.vm.provision :shell, :path => "redis/init.sh"

        end

    end

end
