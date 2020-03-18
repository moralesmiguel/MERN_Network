import React from 'react';

//test to check if the call to the express server works
test('the fetch fails with an error', () => {
  fetch('/posts', {
    method: "GET",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      posts: 'this.state.posts'
    })
  })
    .catch(e => expect(e).not.toBe('error'));
  });