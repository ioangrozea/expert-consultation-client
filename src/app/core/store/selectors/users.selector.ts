import {createSelector} from '@ngrx/store';
import {getCoreState} from '@app/core/store';
import * as fromFeature from '../reducers';
import * as fromUsers from '../reducers/users.reducer';
import {Filter, IFilter, IPageData, IUser, PageData, User} from '@app/core';

export const getUsersState = createSelector(getCoreState, (state: fromFeature.CoreState) => state.users);

const getUsersEntitiesAsInterfaces = createSelector(getUsersState, fromUsers.getUsersEntities);
export const getUsersEntities = createSelector(getUsersEntitiesAsInterfaces,
  (users: { [id: number]: IUser }) => {
    const userEntities: { [id: number]: User } = {};
    const userInterfaces = {...users};

    Object.keys(userInterfaces).map(key => {
      userEntities[key] = new User(userInterfaces[key]);
    });

    return userEntities;
  }
);

export const getUsers = createSelector(getUsersEntities, (entities: { [id: number]: User }) => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getUsersLoaded = createSelector(getUsersState, fromUsers.getUsersLoaded);
export const getUsersLoading = createSelector(getUsersState, fromUsers.getUsersLoading);

const getUsersPageDataEntityAsInterface = createSelector(getUsersState, fromUsers.getUsersPageData);
export const getUsersPageData = createSelector(getUsersPageDataEntityAsInterface,
  (iPageData: IPageData) => {
    const pageData = new PageData();
    pageData.fromJson(iPageData);
    return pageData;
  });

const getUserFilterAsInterface = createSelector(getUsersState, fromUsers.getUsersFilter);
export const getUsersFilter = createSelector(getUserFilterAsInterface,
  (iFilter: IFilter) => {
    const filter = new Filter();
    filter.fromJson(iFilter);
    return filter;
  });

