import gql from 'graphql-tag'

export default gql`
  query($filter: String!, $page: Int!) {
    other(filter: $filter, page: $page) {
      page
      results {
        id
        poster_path
      }
    }
  }
`