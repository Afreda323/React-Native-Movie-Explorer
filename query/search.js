import gql from 'graphql-tag'

export default gql`
  query($query: String!, $page: Int!) {
    search(page: $page, query: $query) {
      page
      results {
        id
        title
        overview
        poster_path
        vote_average
        vote_count
        backdrop_path
      }
    }
  }
`
