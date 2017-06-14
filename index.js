function searchRepositories () {
  var query = $('#searchTerms').val()
  var url = 'https://api.github.com/search/repositories?q=' + query

  $.get(url)
    .done(function (data) {
      displayRepositories(data)
    })
    .fail(function() {
      displayError()
    })
}

function displayRepositories (results) {
  $('#results').html(results.items.map(function (result) {
    return (
      `<h1>${result.name}</h1>
      <a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a>
      <ul>
        <li>${result.description}</li>
        <li><a href="${result.url}">${result.url}</a></li>
        <li>${result.owner.login}</li>
        <li><img src="${result.owner.avatar_url}" height="24" width="24"></li>
        <li><a href="${result.owner.html_url}">${result.owner.html_url}</a></li>
      </ul>`
    )
  }))
}

function displayError () {
  $('#errors').html('I\'m sorry, there\'s been an error. Please try again.')
}

function showCommits (el) {
  const repo = el.dataset.repository
  const login = el.dataset.owner
  var url = 'https://api.github.com/repos/' + login + '/' + repo + '/commits'
  $.get(url)
    .done(function (data) {
      displayCommits(data)
    })
    .fail(function() {
      displayError()
    })
}

function displayCommits (results) {
  $('#details').html(results.map(function (result) {
    console.log(result.author)
    return (
      `<h1>${result.commit.message}</h1>
      <ul>
        list the SHA, the author, the author's login, and the author's avatar as an image
        <li>${result.sha}</li>
        <li>${result.commit.author.name}</li>
      </ul>`
    )
  }))
}

$(document).ready(function (){
})
