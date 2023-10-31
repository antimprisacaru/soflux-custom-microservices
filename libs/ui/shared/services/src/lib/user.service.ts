import { Injectable } from '@angular/core';
import { Apollo, gql, MutationResult } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  InputUserRegistration,
  JwtResponseBody,
  User,
} from '@soflux/ui/shared/domain';
import { ApolloQueryResult } from '@apollo/client';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private apolloClient: Apollo) {}

  register(input: InputUserRegistration): Observable<MutationResult<{ register: User }>> {
    return this.apolloClient.mutate<{ register: User }>({
      mutation: gql`
        mutation Register($input: InputUserRegistration!) {
          register(input: $input) {
            id
          }
        }
      `,
      variables: {
        input,
      },
    });
  }

  login(
    email: string,
    password: string
  ): Observable<MutationResult<{ login: JwtResponseBody }>> {
    return this.apolloClient.mutate<{ login: JwtResponseBody }>({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            expiration
            expirationFormatted
          }
        }
      `,
      variables: {
        email,
        password,
      },
    });
  }

  loadCurrentUser(): Observable<ApolloQueryResult<{ currentUser: User }>> {
    return this.apolloClient.query<{ currentUser: User }>({
      query: gql`
        query CurrentUser {
          currentUser {
            id
            firstName
            lastName
            role
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
  }
}
