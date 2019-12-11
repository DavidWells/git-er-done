const util = require('util')
const gitData = require('./src')

const GIT_COMMIT_REF = '9f63b23ec99e36a176d73909fc67a39dc3bd56b7'

gitData({
  base: GIT_COMMIT_REF,
}).then((git) => {
  // Log object
  console.log(util.inspect(git, { showHidden: false, depth: null }))

  // Check if files we care about are modified
  const srcCode = git.fileMatch('**/*.js')
  console.log('srcCode', srcCode)
  if (srcCode.edited) {
    console.log('srcCode has been edited')
    // Do stuff
  }
  console.log(srcCode.getKeyedPaths())

})
