db = db.getSiblingDB('admin')

db.auth("root", "root")

db = db.getSiblingDB('link_shorter_db')

db.createUser({
  user: 'myuser',
  pwd: 'mypassword',
  roles: [{ role: 'readWrite', db: 'link_shorter_db' }]
})

db.createCollection('init')