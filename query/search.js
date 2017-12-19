import gql from 'graphql-tag'

export default gql`
  query($query: String!, $page: Int!) {
    search(page: $page, query: $query) {
      page
      results {
        id
        title
        poster_path
        vote_average
      }
    }
  }
`
