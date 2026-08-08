/** Demo task kinds shared by Alex and Jordan personal (same client UX). */

export function isW2UploadTask(taskId: string): boolean {
  return taskId === "task-alex-w2" || taskId === "task-jordan-w2";
}

export function isQuestionnaireTask(taskId: string): boolean {
  return (
    taskId === "task-alex-questionnaire" ||
    taskId === "task-jordan-questionnaire"
  );
}
