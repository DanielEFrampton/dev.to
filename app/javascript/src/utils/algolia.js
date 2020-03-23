export default function setupAlgoliaIndex({ containerId, indexName }) {
  // Gets Algolia ID, key, and environment from elements on ERB view.
  // This one is found in the `app/views/shell/_top` partial.
  const id = document.querySelector("meta[name='algolia-public-id']").content;
  // This one specifically is found on the element with ID of given containerID,
  // from that element's "data-algolia-key" attribute.
  const key = document.getElementById(containerId).dataset.algoliaKey;
  // This one is found in the `app/views/shell/_top` partial.
  const env = document.querySelector("meta[name='environment']").content;
  // Algolia functions used to push data to Algolia and create "index."
  // Not sure when/where this is imported, but it must be in a previous file.
  const client = algoliasearch(id, key);
  return client.initIndex(`${indexName}_${env}`);
}
