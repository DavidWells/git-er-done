const { LocalGit } = require("./localGit")
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

const cliArgs = {
  base: "develop",
}

async function run() {
  // const localPlatform = new LocalGit(dsl.settings.cliArgs)
  const localPlatform = new LocalGit(cliArgs)
  const git = await localPlatform.getPlatformGitRepresentation()
  console.log('git', git)
}

run()
