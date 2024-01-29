document.getElementById('wikiSearch').addEventListener('click', fetchWikiArticle);

function fetchWikiArticle() {
  const input = document.getElementById('wikiInput').value.trim();
  const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${input}&limit=1&namespace=0&format=json&origin=*`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data[1].length > 0) {
        const title = data[1][0];
        const link = data[3][0];
        const result = `
          <h2 style="font-size: 25px;"><a href="${link}" target="_blank">${title}</a></h2>
          <div id="wikiContent"></div>
        `;
        document.getElementById('wikiResult').innerHTML = result;
        fetchWikiContent(title);
      } else {
        document.getElementById('wikiResult').innerHTML = "No results found.";
      }
    })
    .catch(error => {
      console.error('Error fetching Wikipedia article:', error);
      document.getElementById('wikiResult').innerHTML = "An error occurred while fetching the article.";
    });
}

function fetchWikiContent(title) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&exintro=1&explaintext=1&origin=*`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const content = data.query.pages[Object.keys(data.query.pages)[0]].extract;
      document.getElementById('wikiContent').innerHTML = content;
    })
    .catch(error => {
      console.error('Error fetching Wikipedia content:', error);
      document.getElementById('wikiContent').innerHTML = "An error occurred while fetching the content.";
    });
}