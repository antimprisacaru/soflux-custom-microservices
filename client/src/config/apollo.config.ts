import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, from, InMemoryCache } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { MessageFacade } from '@soflux/ui/shared/store';
import { HttpHeaders } from '@angular/common/http';
import { setContext } from '@apollo/client/link/context';

const basicLink = setContext(() => ({
  headers: {
    Accept: 'charset=utf-8',
  },
}));

const errorLink = (messageFacade: MessageFacade) =>
  onError(({ networkError }) => {
    if (networkError) {
      messageFacade.showMessage({
        closable: true,
        severity: 'error',
        summary: 'Network Error',
        detail: networkError.message,
      });
    }
  });

const authLink = setContext(() => {
  const token = localStorage.getItem('token');

  if (token === null) {
    return {};
  } else {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
});

export const apolloConfig = {
  provide: APOLLO_OPTIONS,
  useFactory(httpLink: HttpLink, messageFacade: MessageFacade) {
    return {
      cache: new InMemoryCache(),
      link: from([
        errorLink(messageFacade),
        basicLink,
        authLink,
        httpLink.create({
          uri: '/graphql',
          withCredentials: true,
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }),
        }),
      ]),
    };
  },
  deps: [HttpLink, MessageFacade],
};
