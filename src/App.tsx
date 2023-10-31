import styled from 'styled-components';
import AddListForm from './components/AddListForm';
import PlayListTable from './components/PlayListTable';
import { IBasePlayList, IPlayList } from './interface';
import EditListForm from './components/EditListForm';
import GlobalStyles from './styles/GlobalStyles ';
import { editListState, editingState, listState } from './atom';
import { useRecoilState } from 'recoil';

const Layout = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  margin: 0 auto;

  h1 {
    margin: 1.5rem 0;
    line-height: 1.2;

    @media (min-width: 600px) {
      font-size: 2.25rem;
    }
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;

  > div {
    padding: 0 1rem;
  }
`;

const App = (): JSX.Element => {
  const [lists, setLists] = useRecoilState(listState);
  const [editList, setEditList] = useRecoilState(editListState);
  const [editing, setEdit] = useRecoilState(editingState);

  const addList = (newList: IBasePlayList) => {
    const id = lists.length + 1;
    setLists([...lists, { ...newList, id }]);
  };

  const onCurrentList = (list: IPlayList) => {
    setEditList(list);
    setEdit(true);
  };

  const onUpdateList = (id: number, newList: IPlayList) => {
    setEdit(false);
    setLists(lists.map((i) => (i.id === id ? newList : i)));
  };

  const onDeleteList = (currentList: IPlayList) => {
    setLists(lists.filter((i) => i.id !== currentList.id));
  };

  return (
    <>
      <GlobalStyles />
      <Layout>
        <h1>CRUD App with Recoil</h1>
        <ListContainer>
          {editing ? (
            <EditListForm
              onUpdateList={onUpdateList}
              setEdit={setEdit}
              currentList={editList}
            />
          ) : (
            <>
              <AddListForm onAddList={addList} />
            </>
          )}
          <PlayListTable
            playLists={lists}
            onEdit={onCurrentList}
            onDelete={onDeleteList}
          />
        </ListContainer>
      </Layout>
    </>
  );
};

export default App;
