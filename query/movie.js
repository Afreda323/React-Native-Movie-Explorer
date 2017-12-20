import gql from 'graphql-tag'

export default gql`
  query($id: String!) {
    movie(id: $id) {
      title
      poster_path
      backdrop_path
      overview
      vote_count
      vote_average
      release_date
      runtime
      genres {
        name
      }
      videos {
        results {
          name
          site
          key
        }
      }
      images {
        posters {
          file_path
          aspect_ratio
        }
        backdrops {
          file_path
          aspect_ratio
        }
      }
      credits {
        cast {
          name
          profile_path
        }
      }
    }
  }
`
