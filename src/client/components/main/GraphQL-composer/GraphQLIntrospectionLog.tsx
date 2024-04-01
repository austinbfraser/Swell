import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../toolkit-refactor/hooks';
import { GraphQLSchema } from 'graphql';

import graphQLController from '../../../controllers/graphQLController';
import TextCodeArea from '../sharedComponents/TextCodeArea';
import { RootState } from '../../../toolkit-refactor/store';

interface IntrospectionData {
  schemaSDL: string | null;
  clientSchema: GraphQLSchema | null;
}

const GraphQLIntrospectionLog: React.FC = () => {
  const headers = useAppSelector(
    (store: RootState) => store.newRequest.newRequestHeaders.headersArr
  );
  const cookies = useAppSelector(
    (store: RootState) => store.newRequest.newRequestCookies.cookiesArr
  );
  const introspectionData: (IntrospectionData | string) = useAppSelector(
    (store: RootState) => store.introspectionData
  );
  const url: string = useAppSelector(
    (store: RootState) => store.newRequestFields.url
  );
  const isDark: boolean = useAppSelector((store: RootState) => store.ui.isDark);

  return (
    <div>
      <button
        className={`${isDark ? 'is-dark-200' : ''} button is-small add-header-or-cookie-button`}
        onClick={() => graphQLController.introspect(url, headers, cookies)}
      >
        Introspect
      </button>
      <div id="gql-introspection">
        {introspectionData === 'Error: Please enter a valid GraphQL API URI' && (
          <div>{introspectionData}</div>
        )}
        {!!introspectionData.schemaSDL && (
          <TextCodeArea
            value={introspectionData.schemaSDL}
            mode="application/json"
            onChange={() => {}}
            readOnly={true}
          />
        )}
      </div>
    </div>
  );
};

export default GraphQLIntrospectionLog;
