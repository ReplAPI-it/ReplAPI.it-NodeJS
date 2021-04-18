import fetch from 'node-fetch';

import headers from '../utils/headers.js';
import constants from '../utils/constants.js';

async function getReplId(username, slug) {
  const info = await constants
    .fetch(`${constants.restful}/data/repls/@${username}/${slug}`, {
      method: 'GET',
      headers,
    })
    .then((res) => res.json());

  return info.id;
}

export default class Repl {
  constructor(username, slug) {
    this.username = username;
    this.slug = slug.replace(/ /g, '-');
  }

  async replGraphQLData() {
    const { username } = this;
    const { slug } = this;

    const id = await getReplId(username, slug);
    const info = await fetch(constants.graphql, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: `
            query Repl($id: String!) {
              repl(id: $id) {
                ... on Repl {
                  ${constants.replAttributes}
                }
              }
            }`,
        variables: JSON.stringify({
          id,
        }),
      }),
    }).then((res) => res.json());

    if (info.errors) throw new Error(`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`);

    if (!info.data.repl) {
      throw new Error(`${slug} is not a repl. Please query repls on Repl.it.`);
    } else {
      return info.data.repl;
    }
  }

  async replRESTData() {
    const { username } = this;
    const { slug } = this;

    const info = await fetch(`${constants.restful}/data/repls/@${username}/${slug}`, {
      method: 'GET',
      headers,
    })
      .then((res) => res.json());

    if (!info) {
      throw new Error(`${slug} is not a repl. Please query repls on Repl.it.`);
    } else {
      return info;
    }
  }

  async replLangs() {
    const { username } = this;
    const { slug } = this;

    const info = await fetch(`https://replangs.rayhanadev.repl.co/${username}/${slug}`, {
      method: 'GET',
      headers,
    }).then((res) => res.json());

    if (info.error) {
      throw new Error(`REPLangs Error: ${info.error}.`);
    } else {
      return info;
    }
  }

  async replTitleGen() {
    const info = await fetch(constants.graphql, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: '{ replTitle }',
      }),
    }).then((res) => res.json());

    if (info.errors) throw new Error(`Replit GraphQL Error(s): ${JSON.stringify(info.errors)}`);
    else return info.data.replTitle;
  }
}
