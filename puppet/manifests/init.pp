# crete the group shipit
group { 'shipit':
  ensure => 'present',
  gid    => '1001',
}

# crete the user shipit
user { 'shipit':
  ensure           => 'present',
  managehome       => true,
  gid              => '1001',
  home             => '/home/deploy',
  password         => '$6$nD4vMHXv$xlQYJuXUwZ.U0mD/6XmcuC6JmfQAj7hN759SuSMue2I6fePPXbzQChJDhRA3XAyO3YNS9SL50ul0ru/G.PWGE.',
  password_max_age => '99999',
  password_min_age => '0',
  shell            => '/bin/bash',
  uid              => '1001',
  purge_ssh_keys   => true,
  require          => [ Group['deploy'] ],
}