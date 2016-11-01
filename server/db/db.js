require('dotenv').config()
const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://nhhfsvxl:PmfmyAew57jYcGCbVPbLg2A2n13rEyXD@elmer.db.elephantsql.com:5432/nhhfsvxl')

// module.exports = sequelize
sequelize.authenticate()
  .then(function () {
    console.log('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })

const Folders = sequelize.define('folders', {
  folderName: {
    type: Sequelize.STRING
  },
  notesInside: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

const Notes = sequelize.define('notes', {
  notesName: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.STRING(2000)
  }
}, {
  freezeTableName: true
})

const Users = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

const NotesUsers = sequelize.define('NotesUsers', {})
const FoldersUsers = sequelize.define('FoldersUsers', {})
const NotesFolders = sequelize.define('NotesFolders', {})

Notes.belongsToMany(Users, {through: NotesUsers, foreignKey: 'noteId'})
Users.belongsToMany(Notes, {through: NotesUsers, foreignKey: 'userId'})

Folders.belongsToMany(Users, {through: FoldersUsers, foreignKey: 'folderId'})
Users.belongsToMany(Folders, {through: FoldersUsers, foreignKey: 'userId'})

Notes.belongsToMany(Folders, {through: NotesFolders, foreignKey: 'noteId'})
Folders.belongsToMany(Notes, {through: NotesFolders, foreignKey: 'folderId'})

// // HELPER TO DROP ALL TABLES
// sequelize.sync({force: true}).then(function () {
//   console.log('Tables have been dropped')
// })

sequelize.sync().then(function () {
  console.log('Tables have been Created')
})

module.exports = {
  Folders: Folders,
  Users: Users,
  Notes: Notes,
  NotesUsers: NotesUsers,
  NotesFolders: NotesFolders,
  FoldersUsers: FoldersUsers
}