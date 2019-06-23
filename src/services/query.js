import gql from 'graphql-tag';

export default gql`
  query{
    allPosts {
      id
      title
      Comments {
        id
        body
        post_id
        date
      }
    }
  }
`;
