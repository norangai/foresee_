const { combineReducers } = require("redux");
import { patientList } from "./patientList";
import { questionList } from "./askProfessionalList";
import { familyMembers } from "./familyMembers";
import { records } from "./records";
import { userArticleScoreList } from "./userArticleScores";
import { user } from "./user";
import { languageReducer } from "./language";

export default combineReducers({
  patientList,
  questionList,
  familyMembers,
  records,
  user,
  userArticleScoreList,
  languageReducer,
});
