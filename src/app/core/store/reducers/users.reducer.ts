import { Filter, IUser, PageData, User } from '@app/core';
import * as fromUsers from '../actions/users.action';

export interface UserState {
  entities: { [id: number]: IUser };
  loaded: boolean;
  loading: boolean;
  pageData: PageData;
  filter: Filter;
}

export const initialState: UserState = {
  entities: {},
  loaded: false,
  loading: false,
  pageData: {} as PageData,
  filter: {
    pageNumber: 0,
    sortField: 'lastName',
    sortDirection: 'asc',
  } as Filter,
};

export function reducer(state = initialState, action: fromUsers.UsersAction): UserState {
  switch (action.type) {
    case fromUsers.UserActionTypes.LoadUsers: {
      const filter: Filter = action.payload;
      if (!filter) {
        return {
          ...state,
          loading: true,
        } as UserState;
      }

      return {
        ...state,
        filter,
        loading: true,
      } as UserState;
    }
    case fromUsers.UserActionTypes.LoadUsersSuccess: {
      const usersPage = action.payload;
      const users: User[] = usersPage.content;
      const entities = users.reduce((e: { [id: number]: User }, user: User) => {
        return {
          ...e,
          [user.id]: user.toJson(),
        };
      }, {});

      return {
        ...state,
        loading: false,
        loaded: true,
        pageData: new PageData(usersPage),
        entities,
      };
    }
    case fromUsers.UserActionTypes.LoadUsersFail: {
      return {
        ...state,
        loading: false,
        loaded: false,
      } as UserState;
    }

    default: {
      return {
        ...state,
      } as UserState;
    }
  }
}

export const getUsersEntities = (state: UserState) => state.entities;
export const getUsersLoading = (state: UserState) => state.loading;
export const getUsersLoaded = (state: UserState) => state.loaded;
export const getUsersPageData = (state: UserState) => state.pageData;
export const getUsersFilter = (state: UserState) => state.filter;
