import * as formStuff from './modules/formStuff'

export const formStuffModule = formStuff

export interface ApplicationState {
  formStuff: formStuff.State,
}

export interface AppThunkAction<TAction> {
  (
    dispatch: (action: TAction) => void,
    getState: () => ApplicationState
  ): void,
}

export const reducers = {
  formStuff: formStuff.reducer,
}
