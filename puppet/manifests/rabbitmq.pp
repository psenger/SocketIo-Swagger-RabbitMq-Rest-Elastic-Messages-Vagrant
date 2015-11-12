class { '::rabbitmq':
  service_manage    => false,
  port              => '5672',
  delete_guest_user => true,
}

rabbitmq_plugin {'rabbitmq_management':
  ensure => present,
}

