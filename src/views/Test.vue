<script lang="ts">
import { gql } from '@apollo/client/core';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { defineComponent, watch } from 'vue';

const remove = gql`
  mutation deleteGame($id: String!) {
    deleteGame(id: $id)
  }
`;
const getUsers = gql`
  {
    getUsers {
      id
      username
      email
    }
  }
`;

export default defineComponent({
  setup() {
    const { result } = useQuery(getUsers);
    const { mutate: deleteGame } = useMutation(remove);
    deleteGame({ id: '2' });
    return {
      result
    };
  }
});
</script>
