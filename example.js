const { LocalGit } = require("./src/localGit")
/*
const CliArgs = {
  base: string
  verbose: string
  externalCiProvider: string
  textOnly: string
  dangerfile: string
  id: string
}
*/

/*
const cliArgs = {
  base: "develop",
}*/
const cliArgs = {}

async function run() {
  console.log('start')
  // const localPlatform = new LocalGit(dsl.settings.cliArgs)
  const localPlatform = new LocalGit(cliArgs)
  console.log('localPlatform', localPlatform)
  const git = await localPlatform.getPlatformGitRepresentation()
  console.log('git', git)
  const srcCode = git.fileMatch("**/*.js")
  if (srcCode.edited) {
    console.log('srcCode has been edited')
  }
  const diff = await git.diffForFile('src/debug.js')
  console.log(diff)
  const linesOfCode = await git.linesOfCode()
  console.log(linesOfCode)
}

run()
