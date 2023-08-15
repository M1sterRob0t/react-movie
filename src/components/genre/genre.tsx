import { Space, Typography } from 'antd';
const { Text } = Typography;

interface IGenreProps {
  genreName: string;
}

function Genre({ genreName }: IGenreProps): JSX.Element {
  return (
    <li className="movie__genres-item">
      <Space direction="vertical">
        <Text code>{genreName}</Text>
      </Space>
    </li>
  );
}

export default Genre;
