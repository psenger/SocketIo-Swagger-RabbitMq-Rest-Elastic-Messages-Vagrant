class {'::mongodb::server':
  port    => 27018,
  verbose => true,
  auth    => true,
}
mongodb::db { 'testdb':
  user          => 'user1',
  password_hash => 'a15fbfca5e3a758be80ceaf42458bcd8',
}