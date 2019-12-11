# Git Er Done

Utility for dealing with modified, created, deleted files since a git commit.

![image](https://user-images.githubusercontent.com/532272/70579463-909bd500-1b65-11ea-926f-bc31cb500ec7.png)

## Install

```bash
npm install git-er-done
```

## Usage


```js
const gitData = require('git-er-done')

// Git commit ref / branch to check against. Default is 'master'
const GIT_COMMIT_REF = '9f63b23ec99e36a176d73909fc67a39dc3bd56b7'

gitData({
  base: GIT_COMMIT_REF,
}).then((git) => {
  /* git data returns
  {
    fileMatch: [Function], <-- Lookup function
    modifiedFiles: [ Array of modified files ],
    createdFiles: [ Array of created files ],
    deletedFiles: [ Array of deleted files ],
    commits: [ Array of commits ],
    linesOfCode: [AsyncFunction: linesOfCode]
  }
  */

  if (modifiedFiles.length) {
    // Some files have changed
  }

  if (createdFiles.length) {
    // Some files have been created
  }

  if (deletedFiles.length) {
    // Some files have been deleted
  }

  /* Using fileMatch function */
  const srcCode = git.fileMatch('src/**/*.js')
  /* srcCode is object
  {
    modified: true,
    created: true,
    deleted: true,
    edited: true,
    getKeyedPaths: [Function: getKeyedPaths]
  }
  */
  if (srcCode.edited) {
    console.log('srcCode has been edited')
    // Do stuff because src edited
  }

  const mdFiles = git.fileMatch('**/*.md')
  if (mdFiles.edited) {
    // Do stuff because markdown files are changed
  }

  const mdFilesData = mdFiles.getKeyedPaths()
  /* mdFilesData is full information on the files in the sub path that changed
  {
    modified: [ Array of modified files ],
    created: [ Array of created files ],
    deleted:[ Array of deleted files ],
    edited: [ Array of edited files ]
  }
  */

  //... Etc. GIT ER DONE
})
```

## Prior art

This was originally found in [danger.js](https://danger.systems/js/) and extracted into this utility
