const bcrypt = require('bcryptjs')
const pass = process.argv[2]
if(!pass){
  console.error('Kullanım: node gen_admin_hash.js <password>')
  process.exit(1)
}
const hash = bcrypt.hashSync(pass, 12)
console.log(hash)
