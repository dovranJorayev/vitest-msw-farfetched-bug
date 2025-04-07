import {
    createJsonQuery,
    createQuery,
    unknownContract,
  } from '@farfetched/core';
  import { allSettled, fork } from 'effector';
  import { http, HttpResponse } from 'msw';
  import { setupServer } from 'msw/node';
  import { describe, expect, it } from 'vitest';
  // import '@testing-library/jest-dom/vitest';
  
  const itMocked = it.extend<{
    msw: void;
  }>({
    msw: [
      async ({}, use) => {
        const handlers = [
          http.get('/api/v1/profile', () => {
            return HttpResponse.json({
              name: 'test user',
            });
          }),
        ];
  
        // Setup the server with handlers
        const server = setupServer(...handlers);
  
        // Start the server
        server.listen({ onUnhandledRequest: 'error' });
  
        // Provide the server to the test
        await use();
  
        // Clean up after test
        server.resetHandlers();
        server.close();
      },
      { auto: true }, // Run for all tests automatically
    ],
  });
  
  describe('CreatePage', () => {
    itMocked('json query', async () => {
      const scope = fork();
  
      const jsonQuery = createJsonQuery({
        request: {
          url: 'реез/api/v1/profile',
          method: 'GET',
        },
        response: {
          contract: unknownContract,
        },
      });
  
      await allSettled(jsonQuery.start, {
        scope,
      });
      expect(scope.getState(jsonQuery.$error)).toBeNull();
      expect(scope.getState(jsonQuery.$data)).toEqual({ name: 'test user' });
    });
  
    itMocked('custom query', async () => {
      const scope = fork();
  
      const jsonQuery = createQuery({
        handler: () => fetch('/api/v1/profile').then((res) => res.json()),
      });
  
      await allSettled(jsonQuery.start, {
        scope,
      });
      expect(scope.getState(jsonQuery.$error)).toBeNull();
      expect(scope.getState(jsonQuery.$data)).toEqual({ name: 'test user' });
    });
  });
  