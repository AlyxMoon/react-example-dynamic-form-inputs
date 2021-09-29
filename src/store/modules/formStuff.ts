import { Action, Reducer } from 'redux'
import { AppThunkAction } from '../'

export interface State {
}

const unloadedState: State = {
}

interface ActionResetGame {
  type: 'DEFAULT_ACTION',
}

type KnownActions = ActionResetGame

export const actionCreators = {
  defaultStuff: (): AppThunkAction<KnownActions> => (dispatch, getState): void => {
    dispatch({ type: 'DEFAULT_ACTION' })
  },
}

export const reducer: Reducer<State> = (
  state: State | undefined,
  incomingAction: Action,
): State => {
  if (!state) return unloadedState
  const action = incomingAction as KnownActions

  switch (action.type) {
    case 'DEFAULT_ACTION':
      return unloadedState
  }

  return state
}
