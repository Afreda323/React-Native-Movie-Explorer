import gql from 'graphql-tag'

export default gql`
  query($page: Int!, $year: Int!, $minRating: Float!, $sort: String!) {
    discover(
      page: $page
      year: $year
      vote_average_gte: $minRating
      sort_by: $sort
    ) {
      page
      results {
        id
        poster_path
      }
    }
  }
`
