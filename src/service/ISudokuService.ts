interface ISudokuService {
  //Read-only initialSudoku
  getInitialSudoku: Function;
  //Read-only solvedSudoku
  getSolvedSudoku: Function;
  //Difficulty
  getDifficulty: Function;
  setDifficulty: Function;
  //User-filled sudoku
  getUserSudoku: Function;
  setUserSudoku: Function;
  //Selected position
  getSelectedPosition: Function;
  setSelectedPosition: Function
}

export default ISudokuService;
