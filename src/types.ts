export type ThemeType = {
  accent: string,
  checkMark: string,
  logo: string,
  background: string,
  backgroundTitle: string,
  navbar: string,
  options: string,
  iconsNavbar: string,
  text: string,
  textList: string,
  textInput: string,
  backdrop: string,
  border: string,
  active: string,
}

export type SongType = {
  number: number,
  title: string,
  path: string,
  content: string,
}

export type SongListType = SongType[]

export type SongFolderType = { title: string, songs: SongListType }

export type SongFoldersType = SongFolderType[]
