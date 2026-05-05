/**
 * Utility script to generate a SHA-256 password hash for admin setup.
 * Usage:  node generate-hash.js [password]
 * If no password is provided, prompts for one interactively.
 */

const crypto = require('crypto');
const readline = require('readline');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const arg = process.argv[2];

if (arg) {
  console.log('\nSHA-256 hash for:', arg);
  console.log(hashPassword(arg));
  console.log('\nCopy this value into your .env file as ADMIN_PASSWORD_HASH');
} else {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('Enter password to hash: ', (password) => {
    if (!password) {
      console.error('Password cannot be empty.');
      process.exit(1);
    }
    console.log('\nSHA-256 hash:');
    console.log(hashPassword(password));
    console.log('\nCopy this value into your .env file as ADMIN_PASSWORD_HASH');
    rl.close();
  });
}
