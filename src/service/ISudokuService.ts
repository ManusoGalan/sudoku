interface ISudokuService {
  //Getter
  getDifficulty: Function;
  getSolvedSudoku: Function;
  getInitialSudoku: Function
  getUserSudoku: Function;
  //Setter
  setDifficulty: Function;
  setUserSudoku: Function;
  toogleLoading: Function;
}

export default ISudokuService;
