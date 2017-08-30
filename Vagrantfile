Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.provision :shell, path: "env/bootstrap.sh"
  config.vm.provision :shell, path: "env/webpack.sh"
  
  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"

  config.vm.provider :virtualbox do |vb|
    vb.cpus = 4
    vb.memory= 4048
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "80"]
    vb.customize ["modifyvm", :id, "--vram", "100"]

    config.vm.synced_folder "./", "/vagrant/home/workspace/"
  end
end
