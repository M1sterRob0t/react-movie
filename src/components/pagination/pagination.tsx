import { Pagination as PaginationAntd } from 'antd';
interface IPaginationProps {
  currentPage: number;
  filmsPerPage: number;
  totalResults: number;
}
function Pagination(props: IPaginationProps): JSX.Element {
  const { currentPage, filmsPerPage, totalResults } = props;
  return (
    <PaginationAntd
      style={{ textAlign: 'center' }}
      defaultCurrent={currentPage}
      pageSize={filmsPerPage}
      total={totalResults}
      /*       onChange={(page) => {
        if (Tab.Search && searchQuery) {
          return fetchData(getFilmsByQuery.bind(null, searchQuery, page), searchQuery);
        } else if (Tab.Search && !searchQuery) {
          return fetchData(getRandomFilms.bind(null, page));
        }
      }} */
      showSizeChanger={false}
    />
  );
}

export default Pagination;
