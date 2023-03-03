export interface ITodo {
  id: number,
  chapter: string,
  title: string,
  completed: boolean,
  priorityCode: number,
  cachedPriorityCode: number
}